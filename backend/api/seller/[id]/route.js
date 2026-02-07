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

    const [
      products,
      reviewsResult,
      totalRentalsCompleted,
      onTimeReturnsCount,
      ratingAgg,
      totalReviews,
      rentalsPerProduct,
      reviewsPerProduct,
    ] = await Promise.all([
      Product.find({ seller: id, isApproved: true }).sort({ createdAt: -1 }),
      Review.find({ seller: id })
        .populate('renter', 'name avatar')
        .sort({ createdAt: -1 })
        .skip(reviewSkip)
        .limit(reviewLimit)
        .lean(),
      Rental.countDocuments({ seller: id, rentalStatus: 'completed' }),
      Rental.countDocuments({
        seller: id,
        rentalStatus: 'completed',
        $expr: { $lte: ['$returnedAt', '$endDate'] },
      }),
      Review.aggregate([
        { $match: { seller: id } },
        { $group: { _id: '$rating', count: { $sum: 1 } } },
        { $sort: { _id: 1 } },
      ]),
      Review.countDocuments({ seller: id }),
      // Per-product rental counts for this seller (completed rentals only)
      Rental.aggregate([
        { $match: { seller: id, rentalStatus: 'completed' } },
        { $group: { _id: '$product', rentalCount: { $sum: 1 } } },
      ]),
      // Per-product review stats for this seller
      Review.aggregate([
        { $match: { seller: id } },
        {
          $group: {
            _id: '$product',
            avgRating: { $avg: '$rating' },
            reviewCount: { $sum: 1 },
          },
        },
      ]),
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

    const onTimeRate = totalRentalsCompleted > 0 ? (onTimeReturnsCount / totalRentalsCompleted) * 100 : 100;
    const reliabilityScore = Math.min(
      100,
      Math.round(
        (averageRating / 5) * 40 +
        Math.min(35, totalRentalsCompleted * 3) +
        (onTimeRate / 100) * 15 +
        (responseRate / 100) * 10
      )
    );

    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratingAgg.forEach((r) => {
      ratingDistribution[r._id] = r.count;
    });

    // Compute lightweight, additive "top picks" metadata per product.
    const rentalsMap = new Map(
      (rentalsPerProduct || []).map((r) => [r._id.toString(), r.rentalCount || 0]),
    );
    const reviewsMap = new Map(
      (reviewsPerProduct || []).map((r) => [
        r._id.toString(),
        {
          avgRating: r.avgRating ?? 0,
          reviewCount: r.reviewCount ?? 0,
        },
      ]),
    );

    const topPicks = products
      .map((p) => {
        const idStr = p._id.toString();
        const rentalCount = rentalsMap.get(idStr) ?? 0;
        const reviewMeta = reviewsMap.get(idStr) || { avgRating: 0, reviewCount: 0 };
        return {
          productId: idStr,
          rentalCount,
          avgRating: reviewMeta.avgRating,
          reviewCount: reviewMeta.reviewCount,
        };
      })
      .sort((a, b) => {
        if (b.rentalCount !== a.rentalCount) return b.rentalCount - a.rentalCount;
        if (b.avgRating !== a.avgRating) return b.avgRating - a.avgRating;
        return (b.reviewCount || 0) - (a.reviewCount || 0);
      })
      .slice(0, 3);

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
        reliabilityScore,
      },
      ratingDistribution,
      topPicks,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ message }, { status: 500 });
  }
}
