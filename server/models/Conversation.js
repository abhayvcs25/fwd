const { Schema, model, Types } = require("mongoose");

const ConversationSchema = new Schema(
  {
    participants: [
      {
        id: { type: Types.ObjectId, required: true },
        role: { type: String, enum: ["customer", "worker"], required: true },
        fullName: { type: String, required: true, trim: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("Conversation", ConversationSchema);
