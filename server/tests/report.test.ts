import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";

const mockPrisma = vi.hoisted(() => ({
  user: { findUnique: vi.fn() },
  hospital: { findMany: vi.fn(), count: vi.fn() },
  province: { findMany: vi.fn() },
  disease: { findUnique: vi.fn() },
}));

const mockReportModel = vi.hoisted(() => ({
  create: vi.fn(),
  find: vi.fn(),
  aggregate: vi.fn(),
}));

vi.mock("@prisma/client", () => ({
  PrismaClient: vi.fn(function () { return mockPrisma; }),
}));
vi.mock("../db/connectMongo", () => ({ default: vi.fn() }));
vi.mock("../models/reportModel", () => ({ default: mockReportModel }));

import app from "../app";

describe("POST /api/report", () => {
  it("ควรคืน 401 เมื่อไม่มี token", async () => {
    const res = await request(app)
      .post("/api/report")
      .send({ icdCode: "A00", age: 30, sex: "male" });
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toBe("กรุณาเข้าสู่ระบบ");
  });

  it("ควรคืน 201 เมื่อ POST report สำเร็จ", async () => {
    const token = jwt.sign(
      {
        userId: 1,
        username: "testuser",
        hospitalId: "H001",
        hospitalName: "Test Hospital",
        provinceId: "P01",
        provinceName: "Bangkok",
      },
      "test_secret",
      { expiresIn: "1h" }
    );

    mockPrisma.disease.findUnique.mockResolvedValue({
      id: 1,
      icdCode: "A00",
      name: "Cholera",
    });

    mockReportModel.create.mockResolvedValue({
      _id: "mock_id",
      hospitalId: "H001",
      icdCode: "A00",
      diseaseName: "Cholera",
      age: 30,
      sex: "male",
    });

    const res = await request(app)
      .post("/api/report")
      .set("Authorization", `Bearer ${token}`)
      .send({ icdCode: "A00", age: 30, sex: "male" });

    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body).toHaveProperty("data");
  });
});
