import Product from "../models/Product.js";

export const createProduct = async (data, farmerId) => {
  if (data.price <= 0 || data.quantity < 0) {
    throw new Error("Invalid price or quantity");
  }

  const product = await Product.create({
    ...data,
    farmer: farmerId,
    qualityStatus: "Pending",
    isAvailableForSale: false
  });

  return product;
};

export const getProductById = async (id) => {
  return await Product.findById(id).populate("farmer", "name email");
};

export const getProductsByFarmer = async (farmerId) => {
  return await Product.find({ farmer: farmerId });
};
