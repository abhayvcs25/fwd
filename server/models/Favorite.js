const { Schema, model, Types } = require('mongoose');

const FavoriteSchema = new Schema({
  customerId: { type: Types.ObjectId, ref: 'Customer', required: true, index: true },
  // workerId references the same 'Customer' collection for workers (users with role='worker')
  workerId: { type: Types.ObjectId, ref: 'Worker1', required: true, index: true },
}, { timestamps: true });

// prevent duplicates — customer cannot favorite same worker twice
FavoriteSchema.index({ customerId: 1, workerId: 1 }, { unique: true });

module.exports = model('Favorite', FavoriteSchema);
