import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { create, accept, reject } from "../controllers/connection.controller.js";

const router = express.Router();

router.post("/create", protect, create);
router.post("/accept", protect, accept);
router.post("/reject", protect, reject);

export default router;
