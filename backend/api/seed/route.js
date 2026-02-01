import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../lib/mongodb.js';
import User from '../../models/User.js';
import Product from '../../models/Product.js';
import Rental from '../../models/Rental.js';
import Review from '../../models/Review.js';

export async function GET() {
  try {
    await dbConnect();

    await User.deleteMany({});
    await Product.deleteMany({});
    await Rental.deleteMany({});
    await Review.deleteMany({});

    return NextResponse.json({ message: 'Database cleared successfully (dummy data removed)' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
