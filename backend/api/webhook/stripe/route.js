import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '../../../lib/stripe.js';
import dbConnect from '../../../lib/mongodb.js';
import Rental from '../../../models/Rental.js';

export async function POST(req) {
  const body = await req.text();
  const headersList = await headers();
  const signature = headersList.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 });
  }

  if (!stripe) {
    return NextResponse.json({ error: 'Stripe not configured' }, { status: 503 });
  }

  let event;

  try {
    event = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    if (session.payment_status === 'paid') {
      try {
        await dbConnect();
        const rentalIdsRaw = session.metadata?.rentalIds;
        const rentalIds = rentalIdsRaw
          ? rentalIdsRaw.split(',').map((id) => id.trim()).filter(Boolean)
          : session.metadata?.rentalId
            ? [session.metadata.rentalId]
            : [];

        for (const rentalId of rentalIds) {
          await Rental.findByIdAndUpdate(rentalId, {
            paymentStatus: 'paid',
            rentalStatus: 'upcoming',
            stripeSessionId: session.id,
          });
          console.log(`Rental ${rentalId} payment completed`);
        }
      } catch (dbError) {
        console.error('Database update error:', dbError.message);
      }
    }
  }

  return NextResponse.json({ received: true });
}
