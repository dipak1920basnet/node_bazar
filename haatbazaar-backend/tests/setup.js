import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.DB_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});
