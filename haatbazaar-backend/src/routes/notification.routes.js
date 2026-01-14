import express from "express";
import protect from "../middlewares/auth.middleware.js";
import { list, read } from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/list", protect, list);
router.post("/read/:id", protect, read);

export default router;
