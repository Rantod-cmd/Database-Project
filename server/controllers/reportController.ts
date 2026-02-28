import { Request, Response } from "express";
import mongoose from "mongoose";
import ReportModel from "../models/reportModel";

export const postReport = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      hospitalId, //
      hospitalName, //
      provinceName, //
      diseaseId,
      icdCode, //
      diseaseName, //
      age,
      sex,
    } = req.body;

    // if (
    //   hospital_id === undefined ||
    //   disease_id === undefined ||
    //   age === undefined ||
    //   sex === undefined
    // ) {
    //   res.status(400).json({
    //     success: false,
    //     message: "กรุณากรอกข้อมูลให้ครบ",
    //   });
    //   return;
    // }

    const newReport = await ReportModel.create({
      hospitalId,
      hospitalName,
      provinceName,
      diseaseId,
      icdCode,
      diseaseName,
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
