import {
  createConnection,
  respondToConnection
} from "../services/connection.service.js";

export const create = async (req, res) => {
  try {
    const connection = await createConnection(req.user._id, req.body.farmerId);
    res.status(201).json(connection);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const accept = async (req, res) => {
  const connection = await respondToConnection(req.body.connectionId, "Accepted");
  res.json(connection);
};

export const reject = async (req, res) => {
  const connection = await respondToConnection(req.body.connectionId, "Rejected");
  res.json(connection);
};
