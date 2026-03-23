import { describe, it, expect, vi, beforeAll } from "vitest";
import request from "supertest";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const mockPrisma = vi.hoisted(() => ({
  user: { findUnique: vi.fn() },
  hospital: { findMany: vi.fn(), count: vi.fn() },
  province: { findMany: vi.fn() },
  disease: { findUnique: vi.fn() },
}));

vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn(function () { return mockPrisma; }),
}));
vi.mock("../db/connectMongo", () => ({ default: vi.fn() }));
vi.mock("../models/reportModel", () => ({
  default: { create: vi.fn(), aggregate: vi.fn() },
}));

import app from "../app";

let hashedPassword: string;

beforeAll(async () => {
  hashedPassword = await bcrypt.hash("correctpassword", 10);
});

describe("POST /api/auth - Login", () => {
  it("ควรคืน 400 เมื่อไม่ใส่ username และ password", async () => {
    const res = await request(app).post("/api/auth").send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("กรุณากรอกข้อมูลให้ครบ");
  });

  it("ควรคืน 400 เมื่อ username ไม่ถูกต้อง", async () => {
    mockPrisma.user.findUnique.mockResolvedValue(null);
    const res = await request(app)
      .post("/api/auth")
      .send({ username: "nobody", password: "somepass" });
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("รหัสผ่านหรือไอดีไม่ถูกต้อง");
  });

  it("ควรคืน 200 พร้อม token เมื่อ login สำเร็จ", async () => {
    mockPrisma.user.findUnique.mockResolvedValue({
      id: 1,
      username: "testuser",
      password: hashedPassword,
      hospitalId: "H001",
      hospital: {
        name: "Test Hospital",
        provinceId: "P01",
        province: { name: "Bangkok" },
      },
    });

    const res = await request(app)
      .post("/api/auth")
      .send({ username: "testuser", password: "correctpassword" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body.payload.username).toBe("testuser");
  });
});

describe("GET /api/auth/checkMe", () => {
  it("ควรคืน isAuthenticated: false เมื่อไม่มี token", async () => {
    const res = await request(app).get("/api/auth/checkMe");
    expect(res.status).toBe(200);
    expect(res.body.isAuthenticated).toBe(false);
    expect(res.body.role).toBe("guest");
  });
});
