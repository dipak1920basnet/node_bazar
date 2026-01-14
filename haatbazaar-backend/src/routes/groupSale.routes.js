import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { join, get } from "../controllers/groupSale.controller.js";

const router = express.Router();

router.post("/join", protect, join);
router.get("/:productId", get);

export default router;
