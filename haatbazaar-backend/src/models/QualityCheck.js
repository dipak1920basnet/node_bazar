import mongoose from "mongoose";

const qualitySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },

    freshness: Number,
    sizeWeight: Number,
    packaging: Number,

    status: {
      type: String,
      enum: ["Pending", "Approved", "Rejected"],
      default: "Pending"
    },

    feedback: String
  },
  { timestamps: true }
);

export default mongoose.model("QualityCheck", qualitySchema);
