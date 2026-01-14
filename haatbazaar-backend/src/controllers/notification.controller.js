import {
  getNotifications,
  sendNotification,
  markAsRead
} from "../services/notification.service.js";

export const list = async (req, res) => {
  const notifications = await getNotifications(req.user._id);

  const unreadCount = notifications.filter(
    (n) => n.status === "Unread"
  ).length;

  res.json({ unreadCount, notifications });
};

export const read = async (req, res) => {
  const notif = await markAsRead(req.params.id, req.user._id);
  res.json(notif);
};
