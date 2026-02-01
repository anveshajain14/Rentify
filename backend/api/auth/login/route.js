import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import AuditLog from '../../../models/AuditLog.js';
import { signToken, setAuthCookie } from '../../../lib/auth.js';
import { generateOTP, hashOTP } from '../../../lib/otp.js';
import { sendLoginOTPEmail } from '../../../lib/email.js';

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000; // 15 minutes
const ENABLE_LOGIN_OTP = process.env.ENABLE_LOGIN_OTP === 'true';

async function getClientInfo(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  return { ip, userAgent };
}

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();
    const { ip, userAgent } = await getClientInfo(req);

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      await AuditLog.create({ action: 'login_failed', email, ip, userAgent, metadata: { reason: 'not_found' } });
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    if (user.isBlocked) {
      return NextResponse.json({ message: 'Account is blocked. Contact support.' }, { status: 403 });
    }

    if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
      await AuditLog.create({ action: 'login_locked', userId: user._id, email, ip, userAgent });
      return NextResponse.json({
        message: 'Account temporarily locked due to too many failed attempts. Try again later.',
        lockedUntil: user.lockedUntil,
      }, { status: 423 });
    }

    if (user.lockedUntil && new Date(user.lockedUntil) <= new Date()) {
      await User.findByIdAndUpdate(user._id, { failedLoginAttempts: 0, lockedUntil: null });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const newAttempts = (user.failedLoginAttempts || 0) + 1;
      const updates = { failedLoginAttempts: newAttempts };
      if (newAttempts >= MAX_FAILED_ATTEMPTS) {
        updates.lockedUntil = new Date(Date.now() + LOCK_DURATION_MS);
      }
      await User.findByIdAndUpdate(user._id, updates);
      await AuditLog.create({ action: 'login_failed', userId: user._id, email, ip, userAgent, metadata: { attempts: newAttempts } });
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    if (user.isVerified === false) {
      return NextResponse.json({
        message: 'Please verify your email before logging in.',
        requiresVerification: true,
        email: user.email,
      }, { status: 403 });
    }

    if (ENABLE_LOGIN_OTP) {
      const otp = generateOTP();
      const hashedOtp = await hashOTP(otp);
      const otpExpiry = new Date();
      otpExpiry.setMinutes(otpExpiry.getMinutes() + 5);
      await User.findByIdAndUpdate(user._id, {
        loginOTP: hashedOtp,
        loginOTPExpiry: otpExpiry,
      });
      await sendLoginOTPEmail(user.email, otp);
      return NextResponse.json({
        message: 'OTP sent to your email',
        requiresOtp: true,
        email: user.email,
        redirect: '/verify-login-otp',
      }, { status: 200 });
    }

    await User.findByIdAndUpdate(user._id, { failedLoginAttempts: 0, lockedUntil: null });

    const token = await signToken({
      id: user._id,
      role: user.role,
      sessionVersion: user.sessionVersion ?? 0,
    });
    await setAuthCookie(token);

    await AuditLog.create({ action: 'login', userId: user._id, email, ip, userAgent });

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
