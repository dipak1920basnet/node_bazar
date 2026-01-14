import express from "express";
import helmet from "helmet";
import cors from "cors";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import rateLimit from "express-rate-limit";

// Middlewares
import errorHandler from "./middlewares/error.middleware.js";

// Initialize Express app
const app = express();

// Body parser
app.use(express.json());

// Security middlewares
app.use(helmet());
app.use(cors());
app.use(
  mongoSanitize({
    checkQuery: false // fixes Node 22+ issue
  })
);

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

// Logging
app.use(morgan("dev"));

// Health check
app.get("/", (req, res) => {
  res.json({ status: "HaatBazaar API Running 🚜" });
});

// Import routes AFTER app is created
import authRoutes from "./routes/auth.routes.js";
app.use("/auth", authRoutes);

// Error middleware (always last)
app.use(errorHandler);


import productRoutes from "./routes/product.routes.js";

app.use("/products", productRoutes);



import reviewRoutes from "./routes/review.routes.js";

app.use("/reviews", reviewRoutes);


import bidRoutes from "./routes/bid.routes.js";

app.use("/bids", bidRoutes);





import groupSaleRoutes from "./routes/groupSale.routes.js";
app.use("/group-sale", groupSaleRoutes);







import connectionRoutes from "./routes/connection.routes.js";
app.use("/connections", connectionRoutes);




import notificationRoutes from "./routes/notification.routes.js";
app.use("/notifications", notificationRoutes);







export default app;


