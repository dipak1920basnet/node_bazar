import express from "express";
import protect from "../middlewares/auth.middleware.js";
import farmerOnly from "../middlewares/role.middleware.js";
import {
  create,
  getOne,
  getByFarmer
} from "../controllers/product.controller.js";

const router = express.Router();

router.post("/create", protect, farmerOnly, create);
router.get("/:id", getOne);
router.get("/farmer/:farmerId", getByFarmer);

export default router;
