import { NextResponse } from 'next/server';
import { removeAuthCookie } from '../../../lib/auth.js';

export async function POST() {
  await removeAuthCookie();
  return NextResponse.json({ message: 'Logged out successfully' });
}
