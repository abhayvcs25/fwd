const { Schema, model, Types } = require('mongoose');

const CustomerSchema = new Schema({
  fullName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  phone: { type: String, default: null },
  companyName: { type: String, default: null },
  location:{ type: String ,default:null},
  profileImage: { type: String, default: null },
  role: { type: String, enum: ['customer','worker','admin'], default: 'customer' },
  isActive: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
  emailVerifiedAt: Date,
  lastLoginAt: Date,
  preferences: { type: Schema.Types.Mixed, default: {} },
  stats: {
    totalBookings: { type: Number, default: 0 },
    favoritesCount: { type: Number, default: 0 }
  },
  softDelete: {
    deleted: { type: Boolean, default: false },
    deletedAt: Date
  },
  authProvider: { type: String, default: 'local' },
  providerId: { type: String, default: null },
}, { timestamps: true });

// index suggestions
CustomerSchema.index({ email: 1 }, { unique: true });
CustomerSchema.index({ 'location.coordinates': '2dsphere' }); // if doing geo-search

module.exports = model('Customer', CustomerSchema);