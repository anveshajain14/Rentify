import { NextResponse } from 'next/server';
import dbConnect from '../../lib/mongodb.js';
import Product from '../../models/Product.js';
import { getAuthUser } from '../../lib/auth.js';
import cloudinary from '../../lib/cloudinary.js';

export async function GET(req) {
  try {
    await dbConnect();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const seller = searchParams.get('seller');
    const approvedOnly = searchParams.get('approved') !== 'false';

    let query = {};
    if (category) query.category = category;
    if (seller) query.seller = seller;
    if (approvedOnly) query.isApproved = true;

    const products = await Product.find(query).populate('seller', 'name avatar location');
    return NextResponse.json({ products });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const user = await getAuthUser();
    if (!user || user.role !== 'seller') {
      return NextResponse.json({ message: 'Only sellers can list products' }, { status: 403 });
    }

    if (!user.isApproved) {
      return NextResponse.json({ message: 'Seller profile must be approved by admin' }, { status: 403 });
    }

    const formData = await req.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const category = formData.get('category');
    const pricePerDay = parseFloat(formData.get('pricePerDay'));
    const pricePerWeek = formData.get('pricePerWeek') ? parseFloat(formData.get('pricePerWeek')) : undefined;
    const pricePerMonth = formData.get('pricePerMonth') ? parseFloat(formData.get('pricePerMonth')) : undefined;
    const securityDeposit = formData.get('securityDeposit') ? parseFloat(formData.get('securityDeposit')) : 0;
    const allowPickup = formData.get('allowPickup') === 'true' || formData.get('allowPickup') === '1';
    const imageFiles = formData.getAll('images');

    if (!title || !description || !category || !pricePerDay || imageFiles.length === 0) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const imageUrls = await Promise.all(
      imageFiles.map(async (file) => {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return new Promise((resolve, reject) => {
          cloudinary.uploader.upload_stream(
            { folder: 'luxe-rent/products' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result.secure_url);
            }
          ).end(buffer);
        });
      })
    );

    await dbConnect();
    const product = await Product.create({
      title,
      description,
      category,
      pricePerDay,
      pricePerWeek,
      pricePerMonth,
      securityDeposit: securityDeposit >= 0 ? securityDeposit : 0,
      allowPickup: !!allowPickup,
      images: imageUrls,
      seller: user._id,
      isApproved: false,
    });

    return NextResponse.json({ message: 'Product submitted for approval', product }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
