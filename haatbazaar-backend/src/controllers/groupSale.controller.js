import {
  joinGroupSale,
  getGroupSale
} from "../services/groupSale.service.js";

export const join = async (req, res) => {
  try {
    const sale = await joinGroupSale(req.user, req.body);
    res.json(sale);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const get = async (req, res) => {
  const sale = await getGroupSale(req.params.productId);
  res.json(sale);
};
