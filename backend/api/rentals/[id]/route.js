import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import Rental from '../../../models/Rental.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function PUT(req, { params }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const { rentalStatus, paymentStatus } = await req.json();
    const resolvedParams = typeof params.then === 'function' ? await params : params;

    await dbConnect();
    const rental = await Rental.findById(resolvedParams.id);
    if (!rental) {
      return NextResponse.json({ message: 'Rental not found' }, { status: 404 });
    }

    if (rentalStatus && rental.seller.toString() !== user._id.toString() && user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const updatedRental = await Rental.findByIdAndUpdate(
      resolvedParams.id,
      { rentalStatus, paymentStatus },
      { new: true }
    );

    return NextResponse.json({ message: 'Rental updated', rental: updatedRental });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
