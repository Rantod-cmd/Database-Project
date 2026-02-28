import { Request, Response } from "express";
import mongoose from "mongoose";
import ReportModel from "../models/reportModel";

export const getDataProvince = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      page = "1",
      limit = "9",
      order = "count_desc",
      risk = "all",
    } = req.query;

    const pageNumber = Math.max(Number(page), 1);
    const limitNumber = Math.max(Number(limit), 1);
    const skip = (pageNumber - 1) * limitNumber;

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

    // risk filter
    let riskMatch: any = {};

    switch (risk) {
      case "normal":
        riskMatch = { totalCount: { $gte: 0, $lte: 500 } };
        break;
      case "warning":
        riskMatch = { totalCount: { $gte: 501, $lte: 3000 } };
        break;
      case "emergency":
        riskMatch = { totalCount: { $gt: 3000 } };
        break;
      default:
        riskMatch = {}; // all
    }

    const pipeline: any[] = [
      // group จังหวัด + โรค
      {
        $group: {
          _id: {
            provinceName: "$provinceName",
            diseaseName: "$diseaseName",
          },
          count: { $sum: 1 },
        },
      },

      // group จังหวัด
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

      // filter ตามระดับความเสี่ยง
      ...(Object.keys(riskMatch).length ? [{ $match: riskMatch }] : []),

      { $sort: sortCondition },
      { $skip: skip },
      { $limit: limitNumber },
    ];

    const data = await ReportModel.aggregate(pipeline);

    res.status(200).json({
      success: true,
      page: pageNumber,
      limit: limitNumber,
      risk,
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
