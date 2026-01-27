import mongoose, { Schema } from 'mongoose';

const ReviewSchema = new Schema({
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  renter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', ReviewSchema);
