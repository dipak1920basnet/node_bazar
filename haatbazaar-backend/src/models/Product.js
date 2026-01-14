import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,

    price: {
      type: Number,
      required: true,
      min: 1
    },

    quantity: {
      type: Number,
      required: true,
      min: 0
    },

    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    averageRating: {
      type: Number,
      default: 0
    },

    highestBid: {
      type: Number,
      default: 0
    },

    qualityStatus: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },

    isAvailableForSale: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
