import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  category: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  pricePerWeek: { type: Number },
  pricePerMonth: { type: Number },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isApproved: { type: Boolean, default: false },
  availability: [{
    startDate: { type: Date },
    endDate: { type: Date }
  }],
}, { timestamps: true });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
