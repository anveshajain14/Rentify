import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from './mongodb.js';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';

export async function signToken(payload) {
  return jwt.sign({ ...payload, sessionVersion: payload.sessionVersion ?? 0 }, JWT_SECRET, { expiresIn: '7d' });
}

export async function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

export async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  const decoded = await verifyToken(token);
  if (!decoded || !decoded.id) return null;

  await dbConnect();
  const user = await User.findById(decoded.id).select('-password');
  if (!user) return null;
  if (user.sessionVersion !== (decoded.sessionVersion ?? 0)) return null;
  return user;
}

export async function setAuthCookie(token) {
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });
}

export async function removeAuthCookie() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
}
