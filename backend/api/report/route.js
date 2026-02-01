import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb.js';
import { getAuthUser } from '../../lib/auth.js';
import User from '../../models/User.js';
import Report from '../../models/Report.js';

export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { reportedUserId, reason } = await req.json();
    if (!reportedUserId || !reason) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    if (String(reportedUserId) === String(user._id)) {
      return NextResponse.json({ message: 'You cannot report yourself' }, { status: 400 });
    }

    await dbConnect();
    const reportedUser = await User.findById(reportedUserId);
    if (!reportedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    await Report.create({
      reporter: user._id,
      reportedUser: reportedUserId,
      reason,
    });

    return NextResponse.json({ message: 'Report submitted' }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Failed to submit report' }, { status: 500 });
  }
}

