import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import { getAuthUser } from '../../../lib/auth.js';

export async function GET() {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    await dbConnect();
    const u = await User.findById(user._id).select('addresses').lean();
    const addresses = u?.addresses || [];
    return NextResponse.json({ addresses });
  } catch (err) {
    return NextResponse.json({ message: err.message || 'Failed to fetch addresses' }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    const body = await req.json();
    const { name, phone, street, city, state, pincode, isDefault } = body;
    if (!name || !phone || !street || !city || !state || !pincode) {
      return NextResponse.json(
        { message: 'Missing required fields: name, phone, street, city, state, pincode' },
        { status: 400 }
      );
    }
    await dbConnect();
    const doc = await User.findById(user._id);
    if (!doc) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    const addresses = doc.addresses || [];
    const newAddr = {
      name: String(name).trim(),
      phone: String(phone).trim(),
      street: String(street).trim(),
      city: String(city).trim(),
      state: String(state).trim(),
      pincode: String(pincode).trim(),
      isDefault: Boolean(isDefault),
    };
    if (newAddr.isDefault) {
      addresses.forEach((a) => { a.isDefault = false; });
    }
    addresses.push(newAddr);
    if (addresses.length === 1) addresses[0].isDefault = true;
    doc.addresses = addresses;
    await doc.save();
    return NextResponse.json({ message: 'Address added', addresses: doc.addresses });
  } catch (err) {
    return NextResponse.json({ message: err.message || 'Failed to add address' }, { status: 500 });
  }
}
