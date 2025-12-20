const { Schema, model, Types } = require('mongoose');

const TransactionSchema = new Schema({
  bookingId: { type: Types.ObjectId, ref: 'Booking', default: null },
  customerId: { type: Types.ObjectId, ref: 'Customer', index: true },
  workerId: { type: Types.ObjectId, ref: 'Worker', index: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'USD' },
  providerId: { type: String },
  status: { type: String, enum: ['pending','paid','refunded'], default: 'pending' }
}, { timestamps: true });

module.exports = model('Transaction', TransactionSchema);
