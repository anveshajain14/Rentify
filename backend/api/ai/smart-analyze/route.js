import { NextResponse } from 'next/server';

const FASTAPI_BASE_URL =
  process.env.FASTAPI_BASE_URL ||
  process.env.PYTHON_AI_URL ||
  'http://localhost:8000';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const mainImage = formData.get('main_image');
    const specImage = formData.get('spec_image');

    if (!mainImage) {
      return NextResponse.json(
        { message: 'main_image is required' },
        { status: 400 }
      );
    }

    const proxyForm = new FormData();
    proxyForm.append('main_image', mainImage);
    if (specImage) {
      proxyForm.append('spec_image', specImage);
    }

    const res = await fetch(`${FASTAPI_BASE_URL}/smart-analyze`, {
      method: 'POST',
      body: proxyForm,
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('Python /smart-analyze error:', text);
      return NextResponse.json(
        { message: 'Smart analyze service unavailable' },
        { status: 502 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    console.error('Smart analyze proxy error:', err);
    return NextResponse.json(
      { message: 'Failed to process smart analyze request' },
      { status: 500 }
    );
  }
}

