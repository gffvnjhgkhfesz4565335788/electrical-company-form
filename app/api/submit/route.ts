import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const FORM_TOKEN = process.env.FORM_TOKEN;
    const API_BASE_URL = process.env.API_BASE_URL;
    const FORM_ID = process.env.FORM_ID;

    if (!FORM_TOKEN || !API_BASE_URL || !FORM_ID) {
      return NextResponse.json({ error: 'Missing environment variables.' }, { status: 500 });
    }

    const upstreamUrl = `${API_BASE_URL}/api/public/forms/${FORM_ID}/submit`;

    const upstreamResponse = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: FORM_TOKEN,
        data: data,
        email: data.email, 
      }),
    });

    if (upstreamResponse.ok) {
        return NextResponse.json({ message: 'Submission forwarded.' });
    } else {
        const errorText = await upstreamResponse.text();
        return upstreamResponse.json();
    }

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to parse submission.' }, { status: 500 });
  }
}
