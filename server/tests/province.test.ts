import { describe, it, expect, vi } from "vitest";
import request from "supertest";

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

describe("GET /api/provinces", () => {
  it("ควรคืน 200 พร้อมรายชื่อจังหวัด", async () => {
    const mockProvinces = [
      { id: "P01", name: "กรุงเทพมหานคร" },
      { id: "P02", name: "เชียงใหม่" },
      { id: "P03", name: "ขอนแก่น" },
    ];
    mockPrisma.province.findMany.mockResolvedValue(mockProvinces);

    const res = await request(app).get("/api/provinces");
    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(3);
    expect(res.body[0].name).toBe("กรุงเทพมหานคร");
  });
});
