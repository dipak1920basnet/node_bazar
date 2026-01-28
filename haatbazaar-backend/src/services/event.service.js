import Event from "../models/Event.js";
import { sendNotification } from "./notification.service.js";

export const listEvents = async () => {
  return Event.find(
    {
      endDate:{$gte: new Date()}
    }
  )
    .populate("farmers", "name")
    .populate("products", "name");
};

export const joinEvent = async (eventId, user) => {
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");
  if (new Date() > event.endDate) {
  throw new Error("Event has already ended");
  }
  if (event.farmers.includes(user.id))
    throw new Error("Already joined");

  event.farmers.push(user.id);
  await event.save();

  await sendNotification(
    user.id,
    "EVENT",
    `You successfully joined ${event.name}`
  );

  return event;
};


export const createEvent = async (data, creatorId) => {
  const event = await Event.create({
    name: data.name,
    date: data.date,
    endDate:date.endDate,
    location: {
      lat: data.lat,
      lng: data.lng
    },
    farmers: [],
    participants: [],
    products: [],
    createdBy: creatorId
  });

  return event;
};

