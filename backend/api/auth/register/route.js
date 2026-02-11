import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import { generateOTP, hashOTP, getOTPExpiry } from '../../../lib/otp.js';
import { sendVerificationEmail } from '../../../lib/email.js';

/* ---------------- PASSWORD VALIDATION (MINIMAL ADDITION) ---------------- */
function isStrongPassword(password) {
  // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  return strongPasswordRegex.test(password);
}
/* ------------------------------------------------------------------------ */

export async function POST(req) {
  try {
    await dbConnect();
    const { name, email, password, role } = await req.json();

    /* ---------------- BASIC VALIDATION ---------------- */
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    /* ---------------- STRONG PASSWORD CHECK ---------------- */
    if (!isStrongPassword(password)) {
      return NextResponse.json(
        {
          message:
            'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.',
        },
        { status: 400 }
      );
    }
    /* ---------------------------------------------------- */

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();
    const hashedOtp = await hashOTP(otp);
    const otpExpiry = getOTPExpiry();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'renter',
      isVerified: false,
      emailVerificationOTP: hashedOtp,
      otpExpiry,
      otpResendCount: 0,
      otpResendWindow: new Date(),
    });

    await sendVerificationEmail(user.email, otp, 7);

    return NextResponse.json(
      {
        message: 'Account created. Please verify your email.',
        redirect: '/verify-email',
        email: user.email,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          isVerified: false,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
