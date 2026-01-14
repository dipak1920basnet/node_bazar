const farmerOnly = (req, res, next) => {
  if (req.user.role !== "farmer") {
    return res.status(403).json({ message: "Farmers only" });
  }
  next();
};

export default farmerOnly;
