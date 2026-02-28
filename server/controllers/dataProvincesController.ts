import { Request, Response } from "express";
import mongoose from "mongoose";
import ReportModel from "../models/reportModel";

export const getDataProvince = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { page = "1", limit = "10", order = "count_desc" } = req.query;

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * limitNumber;

    // กำหนด sort condition
    let sortCondition: any = {};

    switch (order) {
      case "count_asc":
        sortCondition = { totalCount: 1 };
        break;
      case "count_desc":
        sortCondition = { totalCount: -1 };
        break;
      case "name_asc":
        sortCondition = { provinceName: 1 };
        break;
      case "name_desc":
        sortCondition = { provinceName: -1 };
        break;
      default:
        sortCondition = { totalCount: -1 };
    }

    const pipeline: any[] = [
      {
        $group: {
          _id: {
            provinceName: "$provinceName",
            diseaseName: "$diseaseName",
          },
          count: { $sum: 1 },
        },
      },

      {
        $group: {
          _id: "$_id.provinceName",
          totalCount: { $sum: "$count" },
          diseases: {
            $push: {
              diseaseName: "$_id.diseaseName",
              count: "$count",
            },
          },
        },
      },

      {
        $project: {
          _id: 0,
          provinceName: "$_id",
          totalCount: 1,
          diseases: 1,
        },
      },

      // sort ตาม option
      { $sort: sortCondition },

      { $skip: skip },
      { $limit: limitNumber },
    ];

    const data = await ReportModel.aggregate(pipeline);

    res.status(200).json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      data,
    });
  } catch (error) {
    console.error("Get Province Disease Data Error:", error);
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในระบบ",
    });
  }
};
