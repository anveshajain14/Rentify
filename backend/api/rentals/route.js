import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb.js';
import Rental from '../../models/Rental.js';
import Product from '../../models/Product.js';
import { getAuthUser } from '../../lib/auth.js';

export async function GET(req) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    await dbConnect();
    let query = {};
    if (user.role === 'renter') query.renter = user._id;
    else if (user.role === 'seller') query.seller = user._id;
    else if (user.role === 'admin') query = {};

    const rentals = await Rental.find(query)
      .populate('product', 'title images pricePerDay')
      .populate('renter', 'name email')
      .populate('seller', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({ rentals });
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

    const { productId, startDate, endDate, totalAmount } = await req.json();

    if (!productId || !startDate || !endDate || !totalAmount) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    await dbConnect();
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    // Prevent sellers from renting their own listings through the single-rental flow.
    if (String(product.seller) === String(user._id) && user.role === 'seller') {
      return NextResponse.json({ message: 'Sellers cannot rent their own listings' }, { status: 403 });
    }

    const securityDeposit = Number(product.securityDeposit) || 0;
    const rental = await Rental.create({
      product: productId,
      renter: user._id,
      seller: product.seller,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      totalAmount,
      paymentStatus: 'pending',
      rentalStatus: 'upcoming',
      securityDeposit,
      depositStatus: 'held',
    });

    return NextResponse.json({ message: 'Rental request created', rental }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
