import Notification from "../models/Notification.js";

// Send notification
export const sendNotification = async (userId, type, message) => {
  if (!type) throw new Error("Notification type is required");
  const notification = await Notification.create({
    user: userId,
    type,
    message,
    status: "Unread",
  });
  return notification;
};

// Get notifications for a user
export const getNotifications = async (userId) => {
  const notifications = await Notification.find({ user: userId }).sort({ createdAt: -1 });
  const unreadCount = notifications.filter(n => n.status === "Unread").length;
  return { unreadCount, notifications };
};

// Mark notification as read
export const markAsRead = async (id) => {
  const notif = await Notification.findById(id);
  if (!notif) throw new Error("Notification not found");
  notif.status = "Read";
  await notif.save();
  return notif;
};
