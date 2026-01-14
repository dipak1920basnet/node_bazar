import {
  createReview,
  getReviewsForProduct
} from "../services/review.service.js";

export const create = async (req, res) => {
  try {
    const review = await createReview(req.user, req.body);
    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getByProduct = async (req, res) => {
  const reviews = await getReviewsForProduct(req.params.productId);
  res.json(reviews);
};
