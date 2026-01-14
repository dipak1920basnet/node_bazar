import Product from "../models/Product.js";
import Bid from "../models/Bid.js";
import Payment from "../models/Payment.js";
import Review from "../models/Review.js";

export const farmerAnalytics = async (farmerId) => {
  const products = await Product.find({ farmer: farmerId });

  const totalProducts = products.length;

  const productIds = products.map(p => p._id);

  const payments = await Payment.aggregate([
    { $match: { product: { $in: productIds }, status: "Paid" } },
    {
      $group: {
        _id: null,
        totalSales: { $sum: 1 },
        totalEarnings: { $sum: "$amount" }
      }
    }
  ]);

  const bids = await Bid.aggregate([
    { $match: { product: { $in: productIds } } },
    {
      $group: {
        _id: null,
        maxBid: { $max: "$amount" },
        avgBid: { $avg: "$amount" }
      }
    }
  ]);

  return {
    totalProducts,
    totalSales: payments[0]?.totalSales || 0,
    totalEarnings: payments[0]?.totalEarnings || 0,
    biddingPerformance: bids[0] || { maxBid: 0, avgBid: 0 }
  };
};

export const buyerAnalytics = async (buyerId) => {
  const payments = await Payment.find({ user: buyerId, status: "Paid" });

  const totalOrders = payments.length;
  const totalSpent = payments.reduce((a, b) => a + b.amount, 0);

  return {
    totalOrders,
    totalSpent
  };
};
