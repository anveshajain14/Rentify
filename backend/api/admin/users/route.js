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
    const users = await User.find({}).select('-password').sort({ joinedAt: -1 });
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

    const { userId, role, isApproved } = await req.json();
    await dbConnect();
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { role, isApproved },
      { new: true }
    ).select('-password');

    return NextResponse.json({ message: 'User updated', user: updatedUser });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
