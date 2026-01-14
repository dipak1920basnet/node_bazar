import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { initiate, verify } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/initiate", protect, initiate);
router.post("/verify", protect, verify);

export default router;
