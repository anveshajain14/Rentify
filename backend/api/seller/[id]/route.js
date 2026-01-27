import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import Product from '../../../models/Product.js';
import Review from '../../../models/Review.js';
import Rental from '../../../models/Rental.js';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const { id } = resolvedParams;
    const { searchParams } = new URL(req.url);
    const reviewPage = Math.max(1, parseInt(searchParams.get('reviewPage') || '1', 10));
    const reviewLimit = Math.min(20, Math.max(5, parseInt(searchParams.get('reviewLimit') || '10', 10)));
    const reviewSkip = (reviewPage - 1) * reviewLimit;

    const seller = await User.findById(id).select('-password');
    if (!seller || seller.role !== 'seller') {
      return NextResponse.json({ message: 'Seller not found' }, { status: 404 });
    }

    if (!seller.isApproved) {
      return NextResponse.json({ message: 'Seller not found' }, { status: 404 });
    }

    const [products, reviewsResult, totalRentalsCompleted, ratingAgg, totalReviews] = await Promise.all([
      Product.find({ seller: id, isApproved: true }).sort({ createdAt: -1 }),
      Review.find({ seller: id })
        .populate('renter', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(reviewSkip)
        .limit(reviewLimit)
        .lean(),
      Rental.countDocuments({ seller: id, rentalStatus: 'completed' }),
      Review.aggregate([
        { $match: { seller: id } },
        { $group: { _id: '$rating', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Review.countDocuments({ seller: id }),
    ]);

    const avgRatingResult = await Review.aggregate([
      { $match: { seller: id } },
      { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);
    const averageRating = avgRatingResult[0]?.avg ?? 0;
    const activeListings = products.length;

    const responseRate = totalRentalsCompleted > 0 && totalReviews > 0
      ? Math.min(100, Math.round((totalReviews / totalRentalsCompleted) * 100))
      : 98;

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratingAgg.forEach((r) => {
      ratingDistribution[r._id] = r.count;
    });

    return NextResponse.json({
      seller,
      products,
      reviews: reviewsResult,
      totalReviews,
      reviewPage,
      reviewLimit,
      stats: {
        averageRating: Math.round(averageRating * 10) / 10,
        totalRentalsCompleted,
        activeListings,
        responseRate,
        totalReviews,
      },
      ratingDistribution,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ message }, { status: 500 });
  }
}
