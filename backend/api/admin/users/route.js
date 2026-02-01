import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    await dbConnect();
    const users = await User.find({}).select('-password -emailVerificationOTP -loginOTP -passwordResetToken').sort({ joinedAt: -1 });
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const { userId, role, isApproved, isBlocked, isVerified } = await req.json();
    await dbConnect();
    const update = {};
    if (typeof role === 'string') update.role = role;
    if (typeof isApproved === 'boolean') update.isApproved = isApproved;
    if (typeof isBlocked === 'boolean') update.isBlocked = isBlocked;
    if (typeof isVerified === 'boolean') update.isVerified = isVerified;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      update,
      { new: true },
    ).select('-password');

    return NextResponse.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    if (!userId) {
      return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
    }

    await dbConnect();
    await User.findByIdAndDelete(userId);

    return NextResponse.json({ message: 'User deleted' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
