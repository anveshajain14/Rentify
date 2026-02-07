import { NextResponse } from 'next/server';

const PYTHON_AI_URL = process.env.PYTHON_AI_URL || 'http://localhost:8001';

export async function POST(req) {
  try {
    const body = await req.json();
    const res = await fetch(`${PYTHON_AI_URL}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: body.query }),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Python /chat error:', text);
      return NextResponse.json(
        { message: 'Chat service unavailable' },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Chat proxy error:', err);
    return NextResponse.json(
      { message: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

