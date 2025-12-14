const { Schema, model, Types } = require("mongoose");

const ConversationSchema = new Schema(
  {
    participants: [
      {
        id: { type: Types.ObjectId, required: true },
        role: { type: String, enum: ["customer", "worker"], required: true },
        fullName: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

ConversationSchema.index(
  { "participants.id": 1 },
  { unique: false }
);

module.exports = model("Conversation", ConversationSchema);
