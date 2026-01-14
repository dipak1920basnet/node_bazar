import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { create, getByProduct } from "../controllers/review.controller.js";

const router = express.Router();

router.post("/create", protect, create);
router.get("/:productId", getByProduct);

export default router;
