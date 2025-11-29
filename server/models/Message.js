const { Schema, model, Types } = require('mongoose');

const MessageSchema = new Schema({
  conversationId: { type: Types.ObjectId, ref: 'Conversation', index: true },
  senderId: { type: Types.ObjectId, ref: 'Customer', required: true, index: true },
  receiverId: { type: Types.ObjectId, ref: 'Customer', required: true, index: true },
  text: { type: String },
  type: { type: String, enum: ['text','image','file'], default: 'text' },
  readAt: { type: Date, default: null }
}, { timestamps: true });

module.exports = model('Message', MessageSchema);
