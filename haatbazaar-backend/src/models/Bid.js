import mongoose from "mongoose";

const bidSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    amount: {
      type: Number,
      required: true,
      min: 1
    },

    quantity: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Bid", bidSchema);
