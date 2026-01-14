import Review from "../models/Review.js";
import Product from "../models/Product.js";
import { sendNotification } from "./notification.service.js";

export const createReview = async (user, data) => {
  const { productId, rating, comment } = data;

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5");
  }

  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  // Fake purchase check (will be replaced by payment system later)
  const purchased = true; // Simulating for now
  if (!purchased) throw new Error("You must buy before reviewing");

  // Create review
  const review = await Review.create({
    user: user._id,
    product: productId,
    rating,
    comment
  });

  // Recalculate average rating
  const reviews = await Review.find({ product: productId });
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  product.averageRating = avg;
  await product.save();

  // Notify farmer about the new review
  await sendNotification({
    userId: product.farmer, 
    message: `Your product "${product.name}" received a new review`, 
    type: "Review"
  });

  // Notify buyer that review submission was successful
  await sendNotification({
    userId: user._id,
    message: "Your review has been submitted successfully",
    type: "Review"
  });

  return review;
};

export const getReviewsForProduct = async (productId) => {
  return await Review.find({ product: productId }).populate("user", "name");
};
