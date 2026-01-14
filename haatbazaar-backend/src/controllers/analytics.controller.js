import { farmerAnalytics, buyerAnalytics } from "../services/analytics.service.js";

export const farmer = async (req, res) => {
  const data = await farmerAnalytics(req.user.id);
  res.json(data);
};

export const buyer = async (req, res) => {
  const data = await buyerAnalytics(req.user.id);
  res.json(data);
};
