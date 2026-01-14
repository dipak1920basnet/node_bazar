import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { place, getByProduct } from "../controllers/bid.controller.js";

const router = express.Router();

router.post("/place", protect, place);
router.get("/:productId", getByProduct);

export default router;
