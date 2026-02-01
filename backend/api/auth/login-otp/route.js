import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import { generateOTP, hashOTP, getOTPExpiry } from '../../../lib/otp.js';
import { sendLoginOTPEmail } from '../../../lib/email.js';

export async function POST(req) {
  try {
    await dbConnect();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
    }

    if (!user.isVerified) {
      return NextResponse.json({ message: 'Please verify your email first.' }, { status: 403 });
    }

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
      email: user.email,
      redirect: '/verify-login-otp',
    }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
