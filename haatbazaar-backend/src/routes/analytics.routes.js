import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { farmer, buyer } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/farmer", protect, farmer);
router.get("/buyer", protect, buyer);

export default router;
