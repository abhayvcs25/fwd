const { Schema, model, Types } = require("mongoose");

const MessageSchema = new Schema(
  {
    conversationId: {
      type: Types.ObjectId,
      ref: "Conversation",
      required: true,
      index: true,
    },

    senderId: {
      type: Types.ObjectId,
      required: true,
    },

    senderfullName: { type: String, required: true, trim: true },

    receiverfullName: { type: String, required: true, trim: true },   

    receiverId: {
      type: Types.ObjectId,
      required: true,
    },

    senderType: { type: String, enum: ["customer", "worker"], required: true }, 
    receiverType: { type: String, enum: ["customer", "worker"], required: true },

    text: { type: String, default: "" },

    type: {
      type: String,
      enum: ["text", "image", "file"],
      default: "text",
    },

    readAt: { type: Date, default: null },
  },
  { timestamps: true }
);

module.exports = model("Message", MessageSchema);
