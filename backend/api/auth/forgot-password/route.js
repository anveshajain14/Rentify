import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import AuditLog from '../../../models/AuditLog.js';
import { generateResetToken, hashResetToken, getResetTokenExpiry } from '../../../lib/token.js';
import { sendPasswordResetEmail } from '../../../lib/email.js';

async function getClientInfo(req) {
  const forwarded = req.headers.get('x-forwarded-for');
  const ip = forwarded?.split(',')[0]?.trim() || req.headers.get('x-real-ip') || 'unknown';
  const userAgent = req.headers.get('user-agent') || 'unknown';
  return { ip, userAgent };
}

export async function POST(req) {
  try {
    await dbConnect();
    const { email } = await req.json();
    const { ip, userAgent } = await getClientInfo(req);

    if (!email) {
      return NextResponse.json({ message: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      await AuditLog.create({ action: 'reset_request', email, ip, userAgent, metadata: { exists: false } });
      return NextResponse.json({ message: 'If this email exists, a reset link will be sent.' }, { status: 200 });
    }

    const token = generateResetToken();
    const hashedToken = hashResetToken(token);
    const expiry = getResetTokenExpiry();

    await User.findByIdAndUpdate(user._id, {
      passwordResetToken: hashedToken,
      passwordResetExpiry: expiry,
    });

    await sendPasswordResetEmail(user.email, token);
    await AuditLog.create({ action: 'reset_request', userId: user._id, email, ip, userAgent, metadata: { exists: true } });

    return NextResponse.json({ message: 'If this email exists, a reset link will be sent.' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
