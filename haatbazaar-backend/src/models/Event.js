import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: String,
    date: Date,

    location: {
      lat: Number,
      lng: Number
    },

    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    farmers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],

    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.model("Event", eventSchema);
