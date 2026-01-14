import { registerUser, loginUser } from "../services/auth.service.js";

export const register = async (req, res) => {
  try {
    const user = await registerUser(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const user = await loginUser(req.body.email, req.body.password);
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

export const me = (req, res) => {
  res.json(req.user);
};
