# smart_form.py
from ultralytics import YOLO
import cv2
import numpy as np

import chatbot  # reuse configured Gemini + helpers
import pytesseract

pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


model = YOLO("yolov8n.pt")

def read_imagefile(file_bytes) -> np.ndarray:
    npimg = np.frombuffer(file_bytes, np.uint8)
    return cv2.imdecode(npimg, cv2.IMREAD_COLOR)

def detect_objects(image_bytes):
    img = read_imagefile(image_bytes)
    results = model(img)

    detections = []
    for result in results:
        for box, score, cls in zip(
            result.boxes.xyxy.cpu().numpy(),
            result.boxes.conf.cpu().numpy(),
            result.boxes.cls.cpu().numpy()
        ):
            detections.append({
                "label": model.names[int(cls)],
                "confidence": float(score),
                "bbox": box.tolist()
            })
    return detections

def extract_text(image_bytes):
    img = read_imagefile(image_bytes)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    return pytesseract.image_to_string(gray)


def smart_analyze(main_image_bytes, spec_image_bytes):
    """
    Combined vision + OCR + LLM helper used by /smart-analyze.
    Returns a dict matching the required response schema.
    """
    # 1) Object detection
    detections = detect_objects(main_image_bytes)
    best_label = None
    if detections:
        best = max(detections, key=lambda d: d.get("confidence", 0.0))
        best_label = best.get("label")

    # 2) OCR on spec image
    spec_text = extract_text(spec_image_bytes) if spec_image_bytes else ""
    spec_text_clean = spec_text.strip() or None

    # 3) Infer high-level attributes with Gemini, but favour nulls over guesses
    category = brand = None
    colors = None

    try:
        prompt = f"""
You are helping fill a product listing form.
Use ONLY the provided info to infer fields.
If a field is not clearly inferable, set it to null.

Return STRICT JSON with keys:
  "category" (string or null),
  "brand" (string or null),
  "colors" (array of strings or null).

Detected object label: {best_label!r}

Extracted spec text:
\"\"\"{spec_text[:2000] if spec_text else ""}\"\"\"
        """
        llm_raw = chatbot.model.generate_content(prompt).text
        parsed = chatbot.safe_json_parse(llm_raw) or {}
        category = parsed.get("category")
        brand = parsed.get("brand")
        colors_val = parsed.get("colors")
        if isinstance(colors_val, list):
            colors = colors_val
        elif colors_val in (None, "null"):
            colors = None
    except Exception:
        # If Gemini fails, we still return the other grounded fields.
        pass

    return {
        "object": best_label,
        "category": category,
        "colors": colors,
        "brand": brand,
        "description": spec_text_clean,
    }
