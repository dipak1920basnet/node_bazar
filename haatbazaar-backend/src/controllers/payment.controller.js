import {
  initiatePayment,
  verifyPayment
} from "../services/payment.service.js";

export const initiate = async (req, res) => {
  const payment = await initiatePayment(req.user, req.body.amount);
  res.json(payment);
};

export const verify = async (req, res) => {
  try {
    const payment = await verifyPayment(
      req.body.paymentId,
      req.body.success
    );
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
