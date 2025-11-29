const { Schema, model, Types } = require('mongoose');

const BookingSchema = new Schema({
  customerId: { type: Types.ObjectId, ref: 'Customer', required: true, index: true },
  workerId: { type: Types.ObjectId, ref: 'Worker', required: true, index: true },
  requestId: { type: Types.ObjectId, ref: 'Request', default: null },
  serviceName: { type: String },
  details: { type: String },
  scheduledAt: { type: Date },
  duration: { type: String },
  price: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  status: { type: String, enum: ['pending','accepted','in_progress','completed','cancelled','disputed'], default: 'pending' },
  paymentStatus: { type: String, enum: ['pending','paid','refunded'], default: 'pending' }
}, { timestamps: true });

module.exports = model('Booking', BookingSchema);
