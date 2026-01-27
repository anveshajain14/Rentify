import { NextResponse } from 'next/server';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
