// src/controllers/product.controller.js
import {
  createProduct as createProductService,
  getProductById,
  getProductsByFarmer
} from "../services/product.service.js";

// Create a new product
export const create = async (req, res) => {
  try {
    const product = await createProductService(req.body, req.user._id);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a single product by ID
export const getOne = async (req, res) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get products by farmer
export const getByFarmer = async (req, res) => {
  try {
    const products = await getProductsByFarmer(req.params.farmerId);
    res.json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
