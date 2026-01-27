import { NextResponse } from 'next/server';
import dbConnect from '../../../lib/mongodb.js';
import User from '../../../models/User.js';
import { getAuthUser } from '../../../lib/auth.js';
import cloudinary from '../../../lib/cloudinary.js';

export async function PATCH(req) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }
    if (user.role !== 'seller') {
      return NextResponse.json({ message: 'Only sellers can update shop profile' }, { status: 403 });
    }

    await dbConnect();
    const formData = await req.formData();
    const bio = formData.get('bio');
    const location = formData.get('location');
    const policies = formData.get('policies');
    const avatarFile = formData.get('avatar');
    const shopBannerFile = formData.get('shopBanner');

    const update = {};
    if (bio !== null && bio !== undefined) update.bio = bio;
    if (location !== null && location !== undefined) update.location = location;
    if (policies !== null && policies !== undefined) update.policies = policies;

    const uploadStream = (buffer, folder) =>
      new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        ).end(buffer);
      });

    if (avatarFile && avatarFile.size > 0) {
      const bytes = await avatarFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      update.avatar = await uploadStream(buffer, 'luxe-rent/avatars');
    }

    if (shopBannerFile && shopBannerFile.size > 0) {
      const bytes = await shopBannerFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      update.shopBanner = await uploadStream(buffer, 'luxe-rent/banners');
    }

    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { $set: update },
      { new: true }
    ).select('-password');

    return NextResponse.json({ message: 'Shop profile updated', user: updatedUser });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Server error';
    return NextResponse.json({ message }, { status: 500 });
  }
}
