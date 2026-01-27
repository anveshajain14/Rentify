import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['renter', 'seller', 'admin'], default: 'renter' },
  avatar: { type: String, default: '' },
  shopBanner: { type: String, default: '' },
  bio: { type: String, default: '' },
  location: { type: String, default: '' },
  policies: { type: String, default: '' },
  isApproved: { type: Boolean, default: false },
  joinedAt: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.models.User || mongoose.model('User', UserSchema);
