import Connection from "../models/Connection.js";
import { sendNotification } from "./notification.service.js";

export const createConnection = async (buyerId, farmerId) => {
  const existing = await Connection.findOne({ buyer: buyerId, farmer: farmerId });
  if (existing) throw new Error("Request already exists");

  const connection = await Connection.create({
    buyer: buyerId,
    farmer: farmerId
  });

  await sendNotification(
    farmerId,
    "CONNECTION",
    "New connection request received"
  );

  return connection;
};

export const respondToConnection = async (connectionId, status) => {
  const connection = await Connection.findById(connectionId);
  if (!connection) throw new Error("Connection not found");

  connection.status = status;
  await connection.save();

  const msg =
    status === "Accepted"
      ? "Your connection request was accepted"
      : "Your connection request was rejected";

  await sendNotification(connection.buyer, "CONNECTION", msg);

  return connection;
};
