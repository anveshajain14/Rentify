import { NextResponse } from 'next/server';
import { stripe } from '../../lib/stripe.js';
import dbConnect from '../../lib/mongodb.js';
import Rental from '../../models/Rental.js';

export async function POST(req) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { message: 'Stripe is not configured. Set STRIPE_SECRET_KEY in .env' },
        { status: 503 }
      );
    }

    const body = await req.json();
    const rentalId = body?.rentalId;
    const totalAmount = typeof body?.totalAmount === 'number' ? body.totalAmount : parseFloat(body?.totalAmount);

    if (!rentalId || totalAmount == null || Number.isNaN(totalAmount)) {
      return NextResponse.json({ message: 'Missing or invalid rentalId or totalAmount' }, { status: 400 });
    }

    const amountCents = Math.round(totalAmount * 100);
    if (amountCents < 50) {
      return NextResponse.json(
        { message: 'Minimum charge is $0.50 (50 cents)' },
        { status: 400 }
      );
    }

    await dbConnect();
    const rental = await Rental.findById(rentalId).populate('product', 'title');
    if (!rental) {
      return NextResponse.json({ message: 'Rental not found' }, { status: 404 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `Rental: ${rental.product?.title || 'Product Rental'}`,
            },
            unit_amount: amountCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        rentalId: rentalId.toString(),
      },
      success_url: `${baseUrl}/rentals/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/rentals/cancel`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout error:', error);
    const message = error?.message || 'Checkout failed';
    return NextResponse.json({ message }, { status: 500 });
  }
}
