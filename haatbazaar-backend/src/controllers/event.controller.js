import { listEvents, joinEvent, createEvent as createEventService } from "../services/event.service.js";

export const list = async (req, res) => {
  const events = await listEvents();
  res.json(events);
};

export const join = async (req, res) => {
  try {
    const event = await joinEvent(req.body.eventId, req.user);
    res.json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add this
export const create = async (req, res) => {
  try {
    const event = await createEventService(req.body, req.user);
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
