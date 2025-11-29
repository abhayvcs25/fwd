const { Schema, model, Types } = require('mongoose');

const RequestSchema = new Schema({
  customerId: { type: Types.ObjectId, ref: 'Customer', required: true, index: true },
  title: { type: String, required: true },
  description: { type: String },
  serviceId: { type: Types.ObjectId, default: null },
  budget: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' },
  location: { type: String },
  preferredDate: { type: Date },
  status: { type: String, enum: ['open','assigned','in_progress','completed','cancelled'], default: 'open' },
  assignedWorkerId: { type: Types.ObjectId, ref: 'Customer', default: null },
  proposals: [{ workerId: { type: Types.ObjectId, ref: 'Customer' }, price: Number, message: String, createdAt: Date }],
}, { timestamps: true });

module.exports = model('Request', RequestSchema);
