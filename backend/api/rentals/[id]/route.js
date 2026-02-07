import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import Rental from '../../../models/Rental.js';
import Product from '../../../models/Product.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function PUT(req, { params }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    const { rentalStatus, paymentStatus, returnedAt: bodyReturnedAt } = body;
    const resolvedParams = typeof params.then === 'function' ? await params : params;

    await dbConnect();
    const rental = await Rental.findById(resolvedParams.id).populate('product', 'pricePerDay');
    if (!rental) {
      return NextResponse.json({ message: 'Rental not found' }, { status: 404 });
    }

    if (rentalStatus && rental.seller.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const update = { rentalStatus, paymentStatus };
    const returnDate = bodyReturnedAt ? new Date(bodyReturnedAt) : (rentalStatus === 'completed' ? new Date() : null);
    if (returnDate) {
      update.returnedAt = returnDate;
      const end = new Date(rental.endDate);
      if (returnDate > end) {
        const daysLate = Math.ceil((returnDate - end) / (1000 * 60 * 60 * 24));
        const productId = rental.product?._id ?? rental.product;
        const pricePerDay = rental.product?.pricePerDay ?? (productId ? (await Product.findById(productId).select('pricePerDay').lean())?.pricePerDay : 0) ?? 0;
        update.latePenalty = Math.round(Math.max(0, daysLate * pricePerDay) * 100) / 100;
      }
      if (rentalStatus === 'completed') {
        update.depositStatus = update.latePenalty > 0 ? 'deducted' : 'released';
      }
    }

    const updatedRental = await Rental.findByIdAndUpdate(
      resolvedParams.id,
      update,
      { new: true }
    );

    return NextResponse.json({ message: 'Rental updated', rental: updatedRental });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
