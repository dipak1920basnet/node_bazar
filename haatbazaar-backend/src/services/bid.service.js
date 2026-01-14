import Bid from "../models/Bid.js";
import Product from "../models/Product.js";
import { sendNotification } from "./notification.service.js";

export const placeBid = async (user, data) => {
  const { productId, amount, quantity } = data;

  if (amount <= 0) throw new Error("Invalid bid amount");

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  if (quantity > product.quantity)
    throw new Error("Not enough quantity available");

  if (amount <= product.highestBid)
    throw new Error("Bid must be higher than current highest");

  const bid = await Bid.create({
    user: user._id,
    product: productId,
    amount,
    quantity
  });

  product.highestBid = amount;
  await product.save();

  await sendNotification(
    product.farmer,
    "BID",
    `New bid of Rs.${amount} on ${product.name}`
  );

  return bid;
};

export const getBidsForProduct = async (productId) => {
  return await Bid.find({ product: productId }).populate("user", "name");
};
