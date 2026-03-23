import { describe, it, expect, vi } from "vitest";
import request from "supertest";

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

describe("GET /api/dataProvince", () => {
  it("ควรคืน 200 พร้อม data และ pagination", async () => {
    mockReportModel.aggregate.mockResolvedValue([
      { provinceName: "กรุงเทพมหานคร", totalCount: 5000, diseases: [] },
      { provinceName: "เชียงใหม่", totalCount: 1200, diseases: [] },
    ]);

    const res = await request(app).get("/api/dataProvince?page=1&limit=9");
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.page).toBe(1);
    expect(res.body.limit).toBe(9);
    expect(res.body.data).toHaveLength(2);
  });
});
