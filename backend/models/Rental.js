import mongoose, { Schema } from 'mongoose';

const RentalSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  renter: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  seller: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  rentalStatus: { type: String, enum: ['upcoming', 'active', 'completed', 'cancelled'], default: 'upcoming' },
  stripeSessionId: { type: String },
}, { timestamps: true });

export default mongoose.models.Rental || mongoose.model('Rental', RentalSchema);
