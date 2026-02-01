import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import { getAuthUser } from '../../../lib/auth.js';
import Report from '../../../models/Report.js';
import User from '../../../models/User.js';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    await dbConnect();

    const reports = await Report.find({})
      .populate('reporter', 'name email')
      .populate('reportedUser', 'name email role isBlocked')
      .sort({ createdAt: -1 });

    const aggregated = await Report.aggregate([
      {
        $group: {
          _id: '$reportedUser',
          count: { $sum: 1 },
          lastReportAt: { $max: '$createdAt' },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const userMap = new Map();
    reports.forEach((r) => {
      if (r.reportedUser?._id) {
        userMap.set(String(r.reportedUser._id), r.reportedUser);
      }
    });

    const summary = aggregated.map((row) => {
      const u = userMap.get(String(row._id));
      return {
        reportedUserId: row._id,
        count: row.count,
        lastReportAt: row.lastReportAt,
        user: u || null,
      };
    });

    return NextResponse.json({ reports, summary });
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Failed to load reports' }, { status: 500 });
  }
}

