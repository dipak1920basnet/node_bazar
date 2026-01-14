import request from "supertest";
import app from "../src/app.js";

describe("Auth", () => {
  it("registers user", async () => {
    const res = await request(app)
      .post("/auth/register")
      .send({
        name: "Ram",
        email: "ram@test.com",
        password: "password123",
        role: "farmer"
      });

    expect(res.statusCode).toBe(201);
  });

  it("logs in user", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({
        email: "ram@test.com",
        password: "password123"
      });

    expect(res.body.token).toBeDefined();
  });
});
