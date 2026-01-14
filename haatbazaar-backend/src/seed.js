import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import Product from "./models/Product.js";

dotenv.config();
await mongoose.connect(process.env.DB_URI);

const farmer = await User.create({
  name: "Sita",
  email: "sita@test.com",
  password: "password123",
  role: "farmer"
});

await Product.create({
  name: "Tomato",
  price: 50,
  quantity: 100,
  farmer: farmer._id
});

console.log("Seeded");
process.exit();
