import express from "express";
import { sendNotification, getNotifications, markAsRead } from "../services/notification.service.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

// Test route to send a notification
router.post("/test", protect, async (req, res) => {
  try {
    const notification = await sendNotification(
      req.user._id,   // userId
      "TEST",         // type
      "This is a test notification"  // message
    );
    res.status(201).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// List notifications
router.get("/list", protect, async (req, res) => {
  try {
    const notifications = await getNotifications(req.user._id);
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Mark as read
router.post("/read/:id", protect, async (req, res) => {
  try {
    const notification = await markAsRead(req.params.id);
    res.status(200).json(notification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
