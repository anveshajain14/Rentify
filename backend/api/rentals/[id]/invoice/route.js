import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb.js';
import Rental from '../../../../models/Rental.js';
import { getAuthUser } from '../../../../lib/auth.js';

export async function GET(req, { params }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    const resolvedParams = typeof params.then === 'function' ? await params : params;
    const id = resolvedParams?.id;
    if (!id) return NextResponse.json({ message: 'Rental id required' }, { status: 400 });

    await dbConnect();
    const rental = await Rental.findById(id)
      .populate('product', 'title pricePerDay')
      .populate('renter', 'name email')
      .populate('seller', 'name email')
      .lean();
    if (!rental) return NextResponse.json({ message: 'Rental not found' }, { status: 404 });
    if (String(rental.renter._id) !== String(user._id) && String(rental.seller._id) !== String(user._id) && user.role !== 'admin') {
      return NextResponse.json({ message: 'Not authorized' }, { status: 403 });
    }

    const pdfkit = await import('pdfkit');
    const PDFDocument = pdfkit.default ?? pdfkit;
    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const chunks = [];
    doc.on('data', (chunk) => chunks.push(chunk));
    doc.on('end', () => {});
    const finish = new Promise((resolve) => doc.on('end', resolve));

    doc.fontSize(20).text('Rental Agreement / Invoice', { align: 'center' });
    doc.moveDown();
    doc.fontSize(10);
    doc.text(`Rental ID: ${rental._id}`, { align: 'left' });
    doc.text(`Date: ${new Date(rental.createdAt).toLocaleDateString()}`, { align: 'left' });
    doc.moveDown();

    doc.fontSize(12).text('Renter', { continued: false });
    doc.fontSize(10).text(`Name: ${rental.renter?.name || '—'}`);
    doc.text(`Email: ${rental.renter?.email || '—'}`);
    if (rental.shippingAddress && (rental.shippingAddress.street || rental.shippingAddress.city)) {
      doc.text(`Address: ${[rental.shippingAddress.street, rental.shippingAddress.city, rental.shippingAddress.state, rental.shippingAddress.pincode].filter(Boolean).join(', ')}`);
    }
    doc.moveDown();

    doc.fontSize(12).text('Seller', { continued: false });
    doc.fontSize(10).text(`Name: ${rental.seller?.name || '—'}`);
    doc.text(`Email: ${rental.seller?.email || '—'}`);
    doc.moveDown();

    doc.fontSize(12).text('Rental details', { continued: false });
    doc.fontSize(10).text(`Product: ${rental.product?.title || '—'}`);
    doc.text(`Start: ${new Date(rental.startDate).toLocaleDateString()} — End: ${new Date(rental.endDate).toLocaleDateString()}`);
    doc.text(`Fulfillment: ${rental.fulfillmentType === 'pickup' ? 'Self pickup' : 'Delivery'}`);
    doc.text(`Payment method: ${(rental.paymentMethod || 'card').toUpperCase()}`);
    doc.moveDown();

    doc.fontSize(12).text('Amounts', { continued: false });
    doc.fontSize(10).text(`Rental total: $${Number(rental.totalAmount).toFixed(2)}`);
    if (Number(rental.securityDeposit) > 0) doc.text(`Security deposit (refundable): $${Number(rental.securityDeposit).toFixed(2)}`);
    if (Number(rental.damageProtectionFee) > 0) doc.text(`Damage protection: $${Number(rental.damageProtectionFee).toFixed(2)}`);
    if (Number(rental.latePenalty) > 0) doc.text(`Late return penalty: $${Number(rental.latePenalty).toFixed(2)}`);
    doc.moveDown();

    doc.fontSize(9).text('Terms: Security deposit is refundable after return verification. Late returns may incur a per-day penalty. Damage protection may reduce deductions from the deposit.', { align: 'left' });
    doc.end();
    await finish;

    const pdfBuffer = Buffer.concat(chunks);
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="rental-invoice-${id}.pdf"`,
        'Content-Length': String(pdfBuffer.length),
      },
    });
  } catch (err) {
    console.error('Invoice error:', err);
    return NextResponse.json({ message: err?.message || 'Failed to generate invoice' }, { status: 500 });
  }
}
