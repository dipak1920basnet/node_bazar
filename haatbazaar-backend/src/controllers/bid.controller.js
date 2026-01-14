import { placeBid, getBidsForProduct } from "../services/bid.service.js";

export const place = async (req, res) => {
  try {
    const bid = await placeBid(req.user, req.body);
    res.status(201).json(bid);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getByProduct = async (req, res) => {
  const bids = await getBidsForProduct(req.params.productId);
  res.json(bids);
};
