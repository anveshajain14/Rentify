import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import Product from '../../../models/Product.js';
import Rental from '../../../models/Rental.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    await dbConnect();
    const totalUsers = await User.countDocuments();
    const totalSellers = await User.countDocuments({ role: 'seller' });
    const totalProducts = await Product.countDocuments();
    const pendingProducts = await Product.countDocuments({ isApproved: false });
    const totalRentals = await Rental.countDocuments();
    const totalEarnings = await Rental.aggregate([
      { $match: { paymentStatus: 'paid' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    const stats = {
      totalUsers,
      totalSellers,
      totalProducts,
      pendingProducts,
      totalRentals,
      totalEarnings: totalEarnings[0]?.total || 0,
    };

    return NextResponse.json({ stats });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
