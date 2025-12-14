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

    senderRole: {
      type: String,
      enum: ["customer", "worker"],
      required: true,
    },

    text: {
      type: String,
      required: true,
      trim: true,
    },

    readAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = model("Message", MessageSchema);
