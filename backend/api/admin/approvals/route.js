import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import Product from '../../../models/Product.js';
import User from '../../../models/User.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function PUT(req) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const { type, id, isApproved } = await req.json();
    await dbConnect();

    if (type === 'product') {
      await Product.findByIdAndUpdate(id, { isApproved });
    } else if (type === 'seller') {
      await User.findByIdAndUpdate(id, { isApproved });
    } else {
      return NextResponse.json({ message: 'Invalid approval type' }, { status: 400 });
    }

    return NextResponse.json({ message: `${type} approval status updated` });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
