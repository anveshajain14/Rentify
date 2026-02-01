import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import AuditLog from '../../../models/AuditLog.js';
import { verifyOTP } from '../../../lib/otp.js';
import { signToken, setAuthCookie } from '../../../lib/auth.js';

async function getClientInfo(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  return { ip, userAgent };
}

export async function POST(req) {
  try {
    await dbConnect();
    const { email, otp } = await req.json();
    const { ip, userAgent } = await getClientInfo(req);

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    if (!user.loginOTP || !user.loginOTPExpiry) {
      return NextResponse.json({ message: 'No login OTP pending. Please sign in again.' }, { status: 400 });
    }

    if (new Date() > new Date(user.loginOTPExpiry)) {
      return NextResponse.json({ message: 'Login code expired. Please sign in again.' }, { status: 400 });
    }

    const valid = await verifyOTP(otp, user.loginOTP);
    if (!valid) {
      return NextResponse.json({ message: 'Invalid code' }, { status: 400 });
    }

    await User.findByIdAndUpdate(user._id, {
      loginOTP: null,
      loginOTPExpiry: null,
      failedLoginAttempts: 0,
      lockedUntil: null,
    });

    const token = await signToken({
      id: user._id,
      role: user.role,
      sessionVersion: user.sessionVersion ?? 0,
    });
    await setAuthCookie(token);

    await AuditLog.create({ action: 'login', userId: user._id, email, ip, userAgent, metadata: { via: 'otp' } });

    return NextResponse.json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
