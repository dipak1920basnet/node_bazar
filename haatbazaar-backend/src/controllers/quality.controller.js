import { submitQuality, reviewQuality } from "../services/quality.service.js";

export const submit = async (req, res) => {
  try {
    const qc = await submitQuality(req.body);
    res.status(201).json(qc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const review = async (req, res) => {
  try {
    const qc = await reviewQuality(
      req.body.qualityId,
      req.body.approve,
      req.body.feedback
    );
    res.json(qc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
