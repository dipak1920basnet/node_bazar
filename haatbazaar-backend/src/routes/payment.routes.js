import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { initiate, verify } from "../controllers/payment.controller.js";

const paymentRoutes = express.Router();

paymentRoutes.post("/initiate", protect, initiate);
paymentRoutes.post("/verify", protect, verify);

export default paymentRoutes;
