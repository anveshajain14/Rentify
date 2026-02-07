import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/mongodb.js';
import User from '../../../../models/User.js';
import { getAuthUser } from '../../../../lib/auth.js';

export async function PATCH(req, { params }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Address id required' }, { status: 400 });
    const body = await req.json();
    const { name, phone, street, city, state, pincode, isDefault } = body;
    await dbConnect();
    const doc = await User.findById(user._id);
    if (!doc) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    const addresses = doc.addresses || [];
    const idx = addresses.findIndex((a) => String(a._id) === String(id));
    if (idx < 0) return NextResponse.json({ message: 'Address not found' }, { status: 404 });
    if (name !== undefined) addresses[idx].name = String(name).trim();
    if (phone !== undefined) addresses[idx].phone = String(phone).trim();
    if (street !== undefined) addresses[idx].street = String(street).trim();
    if (city !== undefined) addresses[idx].city = String(city).trim();
    if (state !== undefined) addresses[idx].state = String(state).trim();
    if (pincode !== undefined) addresses[idx].pincode = String(pincode).trim();
    if (isDefault === true) {
      addresses.forEach((a) => { a.isDefault = false; });
      addresses[idx].isDefault = true;
    }
    doc.addresses = addresses;
    await doc.save();
    return NextResponse.json({ message: 'Address updated', addresses: doc.addresses });
  } catch (err) {
    return NextResponse.json({ message: err.message || 'Failed to update address' }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    const id = params?.id;
    if (!id) return NextResponse.json({ message: 'Address id required' }, { status: 400 });
    await dbConnect();
    const doc = await User.findById(user._id);
    if (!doc) return NextResponse.json({ message: 'User not found' }, { status: 404 });
    const addresses = (doc.addresses || []).filter((a) => String(a._id) !== String(id));
    if (addresses.length === doc.addresses.length) {
      return NextResponse.json({ message: 'Address not found' }, { status: 404 });
    }
    if (addresses.length > 0 && !addresses.some((a) => a.isDefault)) {
      addresses[0].isDefault = true;
    }
    doc.addresses = addresses;
    await doc.save();
    return NextResponse.json({ message: 'Address deleted', addresses: doc.addresses });
  } catch (err) {
    return NextResponse.json({ message: err.message || 'Failed to delete address' }, { status: 500 });
  }
}
