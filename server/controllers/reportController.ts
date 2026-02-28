import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import mongoose from "mongoose";
import ReportModel from "../models/reportModel";
import { AuthRequest } from "../middleware/authMiddleware";

const prisma = new PrismaClient();

export const postReport = async (
  req: AuthRequest,
  res: Response,
): Promise<void> => {
  try {
    const { icdCode, age, sex } = req.body;
    const tokenData = req.user;
    if (!tokenData) {
      res.status(401).json({ success: false, message: "กรุณาเข้าสู่ระบบ" });
      return;
    }
    const diseaseExists = await prisma.disease.findUnique({
      where: { icdCode: icdCode }
    });

    if (!diseaseExists) {
      res.status(400).json({ success: false, message: "ไม่พบข้อมูลโรคนี้ในระบบ" });
      return;
    }

    const newReport = await ReportModel.create({
      hospitalId: tokenData.hospitalId,
      hospitalName: tokenData.hospitalName,
      provinceName: tokenData.provinceName,
      diseaseId: diseaseExists.id,
      icdCode: diseaseExists.icdCode,
      diseaseName: diseaseExists.name,
      age,
      sex,
    });

    res.status(201).json({
      success: true,
      message: "สร้างรายงานสำเร็จ",
      data: newReport,
    });
  } catch (error) {
    console.error("Create Report Error:", error);

    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในระบบ",
    });
  }
};
