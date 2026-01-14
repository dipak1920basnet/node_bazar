import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    amount: Number,

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    },

    orderId: String
  },
  { timestamps: true }
);

export default mongoose.model("Payment", paymentSchema);
