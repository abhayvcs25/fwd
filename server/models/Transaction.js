const { Schema, model, Types } = require("mongoose");

const TransactionSchema = new Schema(
  {
    workerId: {
      type: Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    customerId: {
      type: Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    bookingId: {
      type: Types.ObjectId,
      ref: "Booking",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Indexes
TransactionSchema.index({ workerId: 1, status: 1 });
TransactionSchema.index({ bookingId: 1 });

module.exports = model("Transaction", TransactionSchema);