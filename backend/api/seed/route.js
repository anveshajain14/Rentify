import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '../../lib/mongodb.js';
import User from '../../models/User.js';
import Product from '../../models/Product.js';
import Rental from '../../models/Rental.js';
import Review from '../../models/Review.js';

export async function GET() {
  try {
    await dbConnect();

    await User.deleteMany({});
    await Product.deleteMany({});
    await Rental.deleteMany({});
    await Review.deleteMany({});

    const hashedPassword = await bcrypt.hash('password123', 10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'aryansingh61777@gmail.com',
      password: hashedPassword,
      role: 'admin',
      isApproved: true,
    });

    const seller1 = await User.create({
      name: 'Modern Rentals',
      email: 'seller1@luxerent.com',
      password: hashedPassword,
      role: 'seller',
      isApproved: true,
      bio: 'Premium furniture and electronics for modern living. We take care of our gear so you get the best experience.',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      shopBanner: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&h=400&fit=crop',
      policies: '• Minimum rental: 1 day.\n• Free cancellation up to 24 hours before pickup.\n• Security deposit may apply; refunded within 48h after return.\n• Items must be returned in same condition. Late returns may incur fees.',
    });

    const seller2 = await User.create({
      name: 'Vintage Collectibles',
      email: 'seller2@luxerent.com',
      password: hashedPassword,
      role: 'seller',
      isApproved: false,
      policies: '',
    });

    const renter1 = await User.create({
      name: 'John Doe',
      email: 'renter1@luxerent.com',
      password: hashedPassword,
      role: 'renter',
      isApproved: true,
    });

    const product1 = await Product.create({
      title: 'Herman Miller Aeron Chair',
      description: 'The gold standard of ergonomic office chairs. Perfect condition.',
      images: ['https://images.unsplash.com/photo-1505843490538-5133c6c7d0e1?w=800'],
      category: 'Furniture',
      pricePerDay: 25,
      pricePerWeek: 150,
      seller: seller1._id,
      isApproved: true,
    });

    const product2 = await Product.create({
      title: 'Sony A7IV Mirrorless Camera',
      description: 'Professional full-frame camera with 24-70mm lens.',
      images: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800'],
      category: 'Electronics',
      pricePerDay: 45,
      pricePerWeek: 250,
      seller: seller1._id,
      isApproved: true,
    });

    const product3 = await Product.create({
      title: 'Apple MacBook Pro M3 Max',
      description: 'Top of the line MacBook for heavy video editing or development.',
      images: ['https://images.unsplash.com/photo-1517336712461-481ad8880c1f?w=800'],
      category: 'Electronics',
      pricePerDay: 60,
      pricePerWeek: 350,
      seller: seller1._id,
      isApproved: true,
    });

    await Rental.create({
      product: product1._id,
      renter: renter1._id,
      seller: seller1._id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      totalAmount: 150,
      paymentStatus: 'paid',
      rentalStatus: 'completed',
    });

    await Review.create({
      rating: 5,
      comment: 'Excellent chair, saved my back during a long project!',
      renter: renter1._id,
      product: product1._id,
      seller: seller1._id,
    });

    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
