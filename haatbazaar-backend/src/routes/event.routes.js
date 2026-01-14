import express from "express";
import { list, join, create } from "../controllers/event.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/list", protect, list);
router.post("/join", protect, join);
router.post("/create", protect, create);  // <- this was missing

export default router;
