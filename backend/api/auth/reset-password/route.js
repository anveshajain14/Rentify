import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import AuditLog from '../../../models/AuditLog.js';
import { hashResetToken } from '../../../lib/token.js';
import { removeAuthCookie } from '../../../lib/auth.js';

async function getClientInfo(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  return { ip, userAgent };
}

export async function POST(req) {
  try {
    await dbConnect();
    const { token, password } = await req.json();
    const { ip, userAgent } = await getClientInfo(req);

    if (!token || !password) {
      return NextResponse.json({ message: 'Token and password are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ message: 'Password must be at least 6 characters' }, { status: 400 });
    }

    const hashedToken = hashResetToken(token);
    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpiry: { $gt: new Date() },
    });

    if (!user) {
      await AuditLog.create({ action: 'reset_failed', email: null, ip, userAgent, metadata: { reason: 'invalid_expired' } });
      return NextResponse.json({ message: 'Invalid or expired reset link. Please request a new one.' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(user._id, {
      password: hashedPassword,
      passwordResetToken: null,
      passwordResetExpiry: null,
      sessionVersion: (user.sessionVersion || 0) + 1,
    });

    await removeAuthCookie();
    await AuditLog.create({ action: 'reset_success', userId: user._id, email: user.email, ip, userAgent });

    return NextResponse.json({
      message: 'Password reset successfully',
      redirect: '/login',
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
