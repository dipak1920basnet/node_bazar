import Payment from "../models/Payment.js";
import Product from "../models/Product.js";
import { sendNotification } from "./notification.service.js";

export const initiatePayment = async (user, productId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  const amount = product.price * quantity;

  const payment = await Payment.create({
    user: user.id,
    product: productId,
    amount,
    orderId: "ORD-" + Date.now()
  });

  return payment;
};

export const verifyPayment = async (orderId, success) => {
  const payment = await Payment.findOne({ orderId }).populate("product");

  if (!payment) throw new Error("Order not found");

  payment.status = success ? "Paid" : "Failed";
  await payment.save();

  if (success) {
    await sendNotification(
      payment.user,
      "PAYMENT",
      `Payment successful for order ${orderId}`
    );

    await sendNotification(
      payment.product.farmer,
      "SALE",
      `Your product ${payment.product.name} was sold`
    );
  }

  return payment;
};
