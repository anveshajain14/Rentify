import { NextResponse } from 'next/server';

const PYTHON_AI_URL = process.env.PYTHON_AI_URL || 'http://localhost:8001';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get('itemId');
  const topK = searchParams.get('topK') || '8';

  if (!itemId) {
    return NextResponse.json(
      { message: 'itemId is required' },
      { status: 400 }
    );
  }

  try {
    const res = await fetch(
      `${PYTHON_AI_URL}/similar?itemId=${encodeURIComponent(
        itemId
      )}&topK=${encodeURIComponent(topK)}`
    );

    if (!res.ok) {
      const text = await res.text();
      console.error('Python /similar error:', text);
      return NextResponse.json(
        { message: 'Recommendation service unavailable' },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Similar proxy error:', err);
    return NextResponse.json(
      { message: 'Failed to fetch similar items' },
      { status: 500 }
    );
  }
}

