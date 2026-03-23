import { describe, it, expect, vi, beforeEach } from "vitest";
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

describe("GET /api/hospital", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("ควรคืน 200 พร้อม pagination ที่ถูกต้อง", async () => {
    const mockHospitals = [
      { id: "H001", name: "โรงพยาบาลจุฬา", beds: 1000, province: { name: "กรุงเทพมหานคร" } },
      { id: "H002", name: "โรงพยาบาลรามา", beds: 800, province: { name: "กรุงเทพมหานคร" } },
    ];
    mockPrisma.hospital.findMany.mockResolvedValue(mockHospitals);
    mockPrisma.hospital.count.mockResolvedValue(10);

    const res = await request(app).get("/api/hospital");
    expect(res.status).toBe(200);
    expect(res.body.data).toHaveLength(2);
    expect(res.body.pagination.total).toBe(10);
    expect(res.body.pagination.totalPages).toBe(2); // 10 / 6 = 2 pages
  });

  it("ควรส่ง search filter ผ่าน where.name.contains", async () => {
    mockPrisma.hospital.findMany.mockResolvedValue([]);
    mockPrisma.hospital.count.mockResolvedValue(0);

    await request(app).get("/api/hospital?search=จุฬา");

    const callArg = mockPrisma.hospital.findMany.mock.calls[0][0];
    expect(callArg.where.name).toEqual({ contains: "จุฬา" });
  });
});
