const { Schema, model, Types } = require("mongoose");

const ReviewSchema = new Schema(
  {
    workerId: {
      type: Types.ObjectId,
      ref: "Customer", // assuming Customer model for users
      required: true,
      index: true,
    },
    customerId: {
      type: Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// Compound index for efficient queries
ReviewSchema.index({ workerId: 1, customerId: 1 });

module.exports = model("Review", ReviewSchema);