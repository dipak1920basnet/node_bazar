import QualityCheck from "../models/QualityCheck.js";
import Product from "../models/Product.js";
import { sendNotification } from "./notification.service.js";

export const submitQuality = async (data) => {
  const { productId, freshness, sizeWeight, packaging } = data;

  if (freshness < 0 || sizeWeight < 0 || packaging < 0)
    throw new Error("Invalid metrics");

  const quality = await QualityCheck.create({
    product: productId,
    freshness,
    sizeWeight,
    packaging
  });

  return quality;
};

export const reviewQuality = async (id, approve, feedback) => {
  const qc = await QualityCheck.findById(id).populate("product");
  if (!qc) throw new Error("Quality check not found");

  qc.status = approve ? "Approved" : "Rejected";
  qc.feedback = feedback;
  await qc.save();

  const product = qc.product;
  product.qualityStatus = qc.status;
  product.isAvailableForSale = approve;
  await product.save();

  await sendNotification(
    product.farmer,
    "QUALITY",
    `Your product ${product.name} was ${qc.status}`
  );

  return qc;
};
