import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { submit, review } from "../controllers/quality.controller.js";

const router = express.Router();

router.post("/check", protect, submit);
router.post("/review", protect, review);

export default router;
