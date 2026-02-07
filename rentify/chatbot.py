"""
chatbot.py

High-level helpers for:
- Intent detection
- Policy QA (full-document grounding, no RAG)
- Item discovery via MongoDB
"""

import os
import json
import re
from typing import List

from pymongo import MongoClient
from docx import Document
import google.generativeai as genai
from dotenv import load_dotenv

# ------------------------------------------------------------------
# Env & Gemini
# ------------------------------------------------------------------

load_dotenv()

genai.configure(
    api_key=os.getenv("GEMINI_API_KEY") or os.getenv("GOOGLE_API_KEY")
)
model = genai.GenerativeModel("gemini-2.5-flash")

# ------------------------------------------------------------------
# Mongo (read-only)
# ------------------------------------------------------------------

client = MongoClient(os.getenv("MONGODB_URI"))
db = client["rentify"]
items_collection = db["items"]

# ------------------------------------------------------------------
# Constants
# ------------------------------------------------------------------

POLICY_FALLBACK_RESPONSE = (
    "I couldn’t find this information in our policy. "
    "Please reach out to our customer support team for accurate assistance."
)

# ------------------------------------------------------------------
# Generic helpers
# ------------------------------------------------------------------

def safe_json_parse(text: str) -> dict:
    text = re.sub(r"```json|```", "", text).strip()
    try:
        return json.loads(text)
    except Exception:
        return {}

# ------------------------------------------------------------------
# Policy loading (FULL DOCUMENT, NO RAG)
# ------------------------------------------------------------------

def _load_policy_sections() -> List[str]:
    """
    Load policy document into logical sections.
    Supports Policy.docx and policies.docx.
    """
    for path in ["Policy.docx", "policies.docx"]:
        if os.path.exists(path):
            doc = Document(path)
            sections = []
            current = ""

            for para in doc.paragraphs:
                if para.text.strip():
                    current += para.text.strip() + "\n"
                else:
                    if current:
                        sections.append(current.strip())
                        current = ""

            if current:
                sections.append(current.strip())

            return sections

    return []

# Load once at startup (deterministic & stable)
_POLICY_SECTIONS = _load_policy_sections()

# ------------------------------------------------------------------
# Intent detection
# ------------------------------------------------------------------

def detect_intent(query: str) -> str:
    """
    Returns: ITEM or POLICY
    """
    prompt = f"""
Classify the user query into ONE category.
Reply with exactly one word.

ITEM   -> item search / recommendations
POLICY -> rules, terms, deposits, late fees, etc.

Query: {query}
"""
    try:
        label = model.generate_content(prompt).text.strip().upper()
    except Exception:
        return "POLICY"

    if "ITEM" in label:
        return "ITEM"
    return "POLICY"

# ------------------------------------------------------------------
# Item discovery
# ------------------------------------------------------------------

def extract_item_filters(query: str) -> dict:
    prompt = f"""
Extract structured filters as valid JSON.

Keys:
  category  (string or null)
  max_price (number or null)
  location  (string or null)

Query: {query}
"""
    try:
        return safe_json_parse(model.generate_content(prompt).text)
    except Exception:
        return {}

def find_items(filters: dict):
    q = {"availability": True}

    if isinstance(filters.get("category"), str) and filters["category"]:
        q["category"] = filters["category"]

    if isinstance(filters.get("location"), str) and filters["location"]:
        q["location"] = filters["location"]

    # Read-only projection; internal IDs hidden
    return list(items_collection.find(q, {"_id": 0}))

# ------------------------------------------------------------------
# Policy QA (e-commerce style fallback)
# ------------------------------------------------------------------

def answer_from_policy(query: str) -> str:
    """
    Answer policy questions using the FULL policy document.
    Respond in a friendly, conversational e-commerce tone.
    """
    if not _POLICY_SECTIONS:
        return POLICY_FALLBACK_RESPONSE

    prompt = f"""
You are a helpful rental marketplace chatbot.

Answer the user's question based on the policy text below.
DO NOT mention section numbers.
DO NOT copy sentences verbatim.
Paraphrase and explain the rules in a clear, friendly,
customer-facing tone, like an e-commerce support assistant.

If the information is not clearly available in the policy,
reply EXACTLY:
{POLICY_FALLBACK_RESPONSE}

POLICY TEXT:
{_POLICY_SECTIONS}

QUESTION:
{query}
"""
    try:
        answer = model.generate_content(prompt).text.strip()
    except Exception:
        return POLICY_FALLBACK_RESPONSE

    if not answer or answer.strip().lower() == POLICY_FALLBACK_RESPONSE.lower():
        return POLICY_FALLBACK_RESPONSE

    return answer


    if not answer or answer.strip().lower() == POLICY_FALLBACK_RESPONSE.lower():
        return POLICY_FALLBACK_RESPONSE

    return answer
