import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb.js';
import Review from '../../models/Review.js';
import Rental from '../../models/Rental.js';
import { getAuthUser } from '../../lib/auth.js';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    const sellerId = searchParams.get('sellerId');

    await dbConnect();
    let query = {};
    if (productId) query.product = productId;
    if (sellerId) query.seller = sellerId;

    const reviews = await Review.find(query)
      .populate('renter', 'name avatar')
      .sort({ createdAt: -1 });

    return NextResponse.json({ reviews });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { productId, sellerId, rating, comment } = await req.json();

    if (!productId || !sellerId || !rating || !comment) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();

    const rental = await Rental.findOne({
      product: productId,
      renter: user._id,
      rentalStatus: 'completed'
    });

    if (!rental && user.role !== 'admin') {
      return NextResponse.json({ message: 'You must complete a rental before leaving a review' }, { status: 403 });
    }

    const review = await Review.create({
      rating,
      comment,
      renter: user._id,
      product: productId,
      seller: sellerId,
    });

    return NextResponse.json({ message: 'Review submitted', review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
