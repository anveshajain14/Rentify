import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import AuditLog from '../../../models/AuditLog.js';
import { verifyOTP } from '../../../lib/otp.js';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, otp } = await req.json();

    if (!email || !otp) {
      return NextResponse.json({ message: 'Email and OTP are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid request' }, { status: 400 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: 'Email already verified', redirect: '/login' }, { status: 200 });
    }

    if (!user.emailVerificationOTP || !user.otpExpiry) {
      return NextResponse.json({ message: 'No verification pending. Please request a new code.' }, { status: 400 });
    }

    if (new Date() > new Date(user.otpExpiry)) {
      return NextResponse.json({ message: 'Verification code has expired. Please request a new one.' }, { status: 400 });
    }

    const valid = await verifyOTP(otp, user.emailVerificationOTP);
    if (!valid) {
      await AuditLog.create({ action: 'verify_otp', email, metadata: { success: false } });
      return NextResponse.json({ message: 'Invalid verification code' }, { status: 400 });
    }

    await User.findByIdAndUpdate(user._id, {
      isVerified: true,
      emailVerificationOTP: null,
      otpExpiry: null,
      otpResendCount: 0,
      otpResendWindow: null,
    });

    await AuditLog.create({ action: 'verify_otp', userId: user._id, email, metadata: { success: true } });

    return NextResponse.json({
      message: 'Email verified successfully',
      redirect: '/login',
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
