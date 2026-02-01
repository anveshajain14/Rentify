import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import Product from '../../../models/Product.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET(req, { params }) {
  try {
    await dbConnect();
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const product = await Product.findById(resolvedParams.id).populate('seller', 'name avatar bio location joinedAt');
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    await dbConnect();
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const product = await Product.findById(resolvedParams.id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    if (product.seller.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const data = await req.json();

    // Preserve approval workflow: seller edits should always re-enter approval.
    if (user.role === 'seller') {
      data.isApproved = false;
    }

    const updatedProduct = await Product.findByIdAndUpdate(resolvedParams.id, data, { new: true });
    return NextResponse.json({ message: 'Product updated', product: updatedProduct });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    await dbConnect();
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const product = await Product.findById(resolvedParams.id);
    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    if (product.seller.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    await Product.findByIdAndDelete(resolvedParams.id);
    return NextResponse.json({ message: 'Product deleted' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
