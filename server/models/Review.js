const { Schema, model, Types } = require('mongoose');

const ReviewSchema = new Schema({
  bookingId: { type: Types.ObjectId, ref: 'Booking', default: null },
  customerId: { type: Types.ObjectId, ref: 'Customer', required: true, index: true },
  workerId: { type: Types.ObjectId, ref: 'Worker', required: true, index: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String },
  visible: { type: Boolean, default: true },
}, { timestamps: true });

ReviewSchema.index({ workerId: 1, rating: -1 });

module.exports = model('Review', ReviewSchema);
