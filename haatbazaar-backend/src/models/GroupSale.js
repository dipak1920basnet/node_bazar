import mongoose from "mongoose";

const groupSaleSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    participants: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        },
        quantity: Number
      }
    ],

    totalRequiredQty: {
      type: Number,
      required: true
    },

    pricePerKg: {
      type: Number,
      required: true
    },

    status: {
      type: String,
      enum: ["Pending", "Completed"],
      default: "Pending"
    }
  },
  { timestamps: true }
);

export default mongoose.model("GroupSale", groupSaleSchema);
