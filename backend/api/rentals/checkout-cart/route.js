import { NextResponse } from 'next/server';
import { stripe } from '../../lib/stripe.js';
import dbConnect from '../../lib/mongodb.js';
import Rental from '../../models/Rental.js';
import Product from '../../models/Product.js';
import { getAuthUser } from '../../lib/auth.js';

function toAddressSnapshot(addr) {
  if (!addr || typeof addr !== 'object') return undefined;
  return {
    name: addr.name != null ? String(addr.name) : '',
    phone: addr.phone != null ? String(addr.phone) : '',
    street: addr.street != null ? String(addr.street) : '',
    city: addr.city != null ? String(addr.city) : '',
    state: addr.state != null ? String(addr.state) : '',
    pincode: addr.pincode != null ? String(addr.pincode) : '',
  };
}

export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const body = await req.json();
    const items = body?.items;
    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ message: 'Cart is empty or invalid' }, { status: 400 });
    }

    const paymentMethod = ['cod', 'card', 'upi'].includes(body?.paymentMethod) ? body.paymentMethod : 'card';
    const fulfillmentType = ['delivery', 'pickup'].includes(body?.fulfillmentType) ? body.fulfillmentType : 'delivery';
    const selectedAddress = toAddressSnapshot(body?.selectedAddress);
    const damageProtectionFee = typeof body?.damageProtectionFee === 'number' ? Math.max(0, body.damageProtectionFee) : 0;

    if (paymentMethod === 'cod' && !stripe) {
      // COD doesn't need Stripe
    } else if (!stripe) {
      return NextResponse.json({ message: 'Stripe is not configured' }, { status: 503 });
    }

    await dbConnect();
    const lineItems = [];
    const rentalIds = [];
    let firstRentalId = null;

    for (let i = 0; i < items.length; i++) {
      const it = items[i];
      const product = await Product.findById(it.productId);
      if (!product) continue;
      const totalAmount = typeof it.totalAmount === 'number' ? it.totalAmount : parseFloat(it.totalAmount);
      if (Number.isNaN(totalAmount) || totalAmount < 0.5) continue;

      if (String(product.seller) === String(user._id) && user.role === 'seller') {
        continue;
      }

      const securityDeposit = Number(product.securityDeposit) || 0;
      const isFirst = rentalIds.length === 0;
      const rentalDamageProtectionFee = isFirst ? damageProtectionFee : 0;

      const rental = await Rental.create({
        product: it.productId,
        renter: user._id,
        seller: product.seller,
        startDate: new Date(it.startDate),
        endDate: new Date(it.endDate),
        totalAmount,
        paymentStatus: paymentMethod === 'cod' ? 'paid' : 'pending',
        rentalStatus: 'upcoming',
        shippingAddress: selectedAddress,
        fulfillmentType,
        paymentMethod,
        securityDeposit,
        depositStatus: 'held',
        damageProtection: rentalDamageProtectionFee > 0,
        damageProtectionFee: rentalDamageProtectionFee,
      });
      rentalIds.push(rental._id.toString());
      if (!firstRentalId) firstRentalId = rental._id.toString();

      const lineAmount = totalAmount + securityDeposit + rentalDamageProtectionFee;
      lineItems.push({
        name: `Rental: ${product.title}${securityDeposit > 0 ? ` (incl. deposit $${securityDeposit.toFixed(2)})` : ''}`,
        amount: Math.round(lineAmount * 100),
      });
    }

    if (rentalIds.length === 0) {
      return NextResponse.json({ message: 'No valid cart items' }, { status: 400 });
    }

    if (paymentMethod === 'cod') {
      return NextResponse.json({
        success: true,
        cod: true,
        rentalIds,
        message: 'Order placed. Cash on delivery.',
      });
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
          unit_amount: Math.max(50, li.amount),
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
