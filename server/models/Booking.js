const { Schema, model, Types } = require('mongoose');

const BookingSchema = new Schema({
  customerId: { type: Types.ObjectId, ref: 'Customer', required: true, index: true },
  workerId: { type: Types.ObjectId, ref: 'Worker', required: true, index: true },
  requestId: { type: Types.ObjectId, ref: 'Request', default: null },
  serviceName: { type: String },
  scheduledAt: { type: Date },
  currency: { type: String, default: 'USD' },
  location: { type: String },
  status: { type: String, enum: ['pending','accepted','in_progress','completed','cancelled','disputed'], default: 'pending' }
}, { timestamps: true });

module.exports = model('Booking', BookingSchema);