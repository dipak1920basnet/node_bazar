// notification.service.js
import Notification from "../models/Notification.js";

export const sendNotification = async (userId, type, message) => {
  if (!type) throw new Error("Notification type is required"); // safeguard

  const notification = await Notification.create({
    user: userId,
    type,       // must always exist
    message,
    status: "Unread"
  });

  return notification;
};


// When sending notification after connection accepted
await sendNotification(
  buyerId,      // recipient
  "CONNECTION", // type
  "Your connection request was accepted"
);

// When sending notification after review
await sendNotification(
  product.farmer,
  "REVIEW",
  `Your product ${product.name} received a new review`
);


db.notifications.deleteMany({ type: { $exists: false } });
