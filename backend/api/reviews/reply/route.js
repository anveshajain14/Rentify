import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import Review from '../../../models/Review.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { reviewId, comment } = await req.json();

    if (!reviewId || !comment) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const review = await Review.findById(reviewId);
    if (!review) {
      return NextResponse.json({ message: 'Review not found' }, { status: 404 });
    }

    // Only the owning seller (or an admin) can reply
    if (user.role !== 'admin' && String(review.seller) !== String(user._id)) {
      return NextResponse.json({ message: 'Not authorized to reply to this review' }, { status: 403 });
    }

    review.sellerReply = {
      comment,
      createdAt: new Date(),
    };

    await review.save();

    return NextResponse.json(
      {
        message: 'Reply saved',
        sellerReply: review.sellerReply,
      },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json({ message: error.message || 'Failed to save reply' }, { status: 500 });
  }
}

