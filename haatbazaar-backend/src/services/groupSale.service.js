import GroupSale from "../models/GroupSale.js";
import { sendNotification } from "./notification.service.js";

export const joinGroupSale = async (user, data) => {
  const { productId, quantity } = data;

  const sale = await GroupSale.findOne({ product: productId });
  if (!sale) throw new Error("No group sale for this product");

  const alreadyJoined = sale.participants.find(
    (p) => p.user.toString() === user._id.toString()
  );
  if (alreadyJoined) throw new Error("Already joined");

  sale.participants.push({ user: user._id, quantity });

  const totalQty = sale.participants.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  if (totalQty >= sale.totalRequiredQty) {
    sale.status = "Completed";

    for (let p of sale.participants) {
      await sendNotification(
        p.user,
        "GROUP_SALE",
        "Group sale completed successfully"
      );
    }
  }

  await sale.save();
  return sale;
};

export const getGroupSale = async (productId) => {
  return await GroupSale.findOne({ product: productId }).populate(
    "participants.user",
    "name"
  );
};
