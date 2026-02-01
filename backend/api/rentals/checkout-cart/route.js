import { NextResponse } from 'next/server';
import { stripe } from '../../lib/stripe.js';
import dbConnect from '../../lib/mongodb.js';
import Rental from '../../models/Rental.js';
import Product from '../../models/Product.js';
import { getAuthUser } from '../../lib/auth.js';

export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    if (!stripe) {
      return NextResponse.json({ message: 'Stripe is not configured' }, { status: 503 });
    }

    const body = await req.json();
    const items = body?.items;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Cart is empty or invalid' }, { status: 400 });
    }

    await dbConnect();
    const lineItems = [];
    const rentalIds = [];

    for (const it of items) {
      const product = await Product.findById(it.productId);
      if (!product) continue;
      const totalAmount = typeof it.totalAmount === 'number' ? it.totalAmount : parseFloat(it.totalAmount);
      if (Number.isNaN(totalAmount) || totalAmount < 0.5) continue;

      // Prevent sellers from renting their own listings via the cart endpoint.
      if (String(product.seller) === String(user._id) && user.role === 'seller') {
        continue;
      }

      const rental = await Rental.create({
        product: it.productId,
        renter: user._id,
        seller: product.seller,
        startDate: new Date(it.startDate),
        endDate: new Date(it.endDate),
        totalAmount,
        paymentStatus: 'pending',
        rentalStatus: 'upcoming',
      });
      rentalIds.push(rental._id.toString());
      lineItems.push({ name: `Rental: ${product.title}`, amount: Math.round(totalAmount * 100) });
    }

    if (rentalIds.length === 0) {
      return NextResponse.json({ message: 'No valid cart items' }, { status: 400 });
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
      'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: lineItems.map((li) => ({
        price_data: {
          currency: 'usd',
          product_data: { name: li.name },
          unit_amount: li.amount,
        },
        quantity: 1,
      })),
      metadata: { rentalIds: rentalIds.join(',') },
      success_url: `${baseUrl}/rentals/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/rentals/cancel`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Checkout cart error:', error);
    return NextResponse.json({ message: error?.message || 'Checkout failed' }, { status: 500 });
  }
}
