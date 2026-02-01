import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import AuditLog from '../../../models/AuditLog.js';
import { generateOTP, hashOTP, getOTPExpiry } from '../../../lib/otp.js';
import { sendVerificationEmail } from '../../../lib/email.js';
import { canResendOTP, updateResendCount } from '../../../lib/rateLimit.js';

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'If this email exists, a verification code will be sent.' }, { status: 200 });
    }

    if (user.isVerified) {
      return NextResponse.json({ message: 'Email already verified', redirect: '/login' }, { status: 200 });
    }

    const { allowed, remaining } = canResendOTP(user);
    if (!allowed) {
      return NextResponse.json({
        message: 'Too many attempts. Please try again in an hour.',
        retryAfter: 3600,
      }, { status: 429 });
    }

    const otp = generateOTP();
    const hashedOtp = await hashOTP(otp);
    const otpExpiry = getOTPExpiry();
    const { count, window } = updateResendCount(user);

    await User.findByIdAndUpdate(user._id, {
      emailVerificationOTP: hashedOtp,
      otpExpiry,
      otpResendCount: count,
      otpResendWindow: window,
    });

    await sendVerificationEmail(user.email, otp, 7);
    await AuditLog.create({ action: 'resend_otp', userId: user._id, email });

    return NextResponse.json({
      message: 'Verification code sent',
      remaining,
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
