import { Request, Response } from "express";
import mongoose from "mongoose";
import ReportModel from "../models/reportModel";

export const getDataProvince = async (
  req: Request,
  res: Response
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

export const getDataProvinceCount = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      order = "count_desc",
      type = "province",
    } = req.query;

    let sortCondition: any = {};

    switch (order) {
      case "count_asc":
        sortCondition = { count: 1 };
        break;
      case "count_desc":
        sortCondition = { count: -1 };
        break;
      case "name_asc":
        sortCondition = { name: 1 };
        break;
      case "name_desc":
        sortCondition = { name: -1 };
        break;
      default:
        sortCondition = { count: -1 };
    }

    let pipeline: any[] = [];
    let response: any = { success: true };

    if (type === "province") {
      pipeline = [
        {
          $group: {
            _id: "$provinceName",
            totalCount: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            provinceName: "$_id",
            totalCount: 1,
          },
        },
        { $sort: { totalCount: sortCondition.count || -1 } },
      ];

      const data = await ReportModel.aggregate(pipeline);
      response.data = data;
      response.total = data.length;

    } else if (type === "disease") {
      pipeline = [
        {
          $group: {
            _id: "$diseaseName",
            patientCount: { $sum: 1 },
            totalCases: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            diseaseName: "$_id",
            patientCount: 1,
            totalCases: 1,
          },
        },
        { $sort: { patientCount: sortCondition.count || -1 } },
      ];

      const data = await ReportModel.aggregate(pipeline);
      response.diseaseData = data;
      response.totalDiseases = data.length;

    } else if (type === "total") {
      pipeline = [
        {
          $group: {
            _id: null,
            totalPatients: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            totalPatients: 1,
          },
        },
      ];

      const data = await ReportModel.aggregate(pipeline);
      response.totalPatients = data[0]?.totalPatients || 0;
    }

    res.status(200).json(response);
  } catch (error) {
    console.error("Get Province Count Error:", error);
    res.status(500).json({
      success: false,
      message: "เกิดข้อผิดพลาดในระบบ",
    });
  }
};

export const getDataProvinceMap = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { order = "count_desc", risk = "all", disease } = req.query;

    let sortCondition: any = {};
    switch (order) {
      case "count_asc": sortCondition = { totalCount: 1 }; break;
      case "count_desc": sortCondition = { totalCount: -1 }; break;
      case "name_asc": sortCondition = { provinceName: 1 }; break;
      case "name_desc": sortCondition = { provinceName: -1 }; break;
      default: sortCondition = { totalCount: -1 };
    }

    let riskMatch: any = {};
    switch (risk) {
      case "normal": riskMatch = { totalCount: { $gte: 0, $lte: 500 } }; break;
      case "warning": riskMatch = { totalCount: { $gte: 501, $lte: 3000 } }; break;
      case "emergency": riskMatch = { totalCount: { $gt: 3000 } }; break;
      default: riskMatch = {};
    }

    const pipeline: any[] = [
      // ✅ Group ทุกโรคก่อนเสมอ ไม่ filter ก่อน group
      {
        $group: {
          _id: { provinceName: "$provinceName", diseaseName: "$diseaseName" },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.provinceName",
          totalCount: { $sum: "$count" },
          diseases: {
            $push: { diseaseName: "$_id.diseaseName", count: "$count" },
          },
        },
      },
      {
        $project: {
          _id: 0,
          provinceName: "$_id",
          totalCount: 1,
          diseases: 1,
          // ✅ ใช้ $eq แทน $regexMatch เพื่อหลีกเลี่ยงปัญหาวงเล็บใน regex
          ...(disease ? {
            diseaseCount: {
              $reduce: {
                input: {
                  $filter: {
                    input: "$diseases",
                    as: "d",
                    cond: {
                      $eq: ["$$d.diseaseName", disease]
                    },
                  },
                },
                initialValue: 0,
                in: { $add: ["$$value", "$$this.count"] },
              },
            },
          } : {}),
        },
      },
      ...(Object.keys(riskMatch).length ? [{ $match: riskMatch }] : []),
      { $sort: sortCondition },
    ];

    const data = await ReportModel.aggregate(pipeline);

    // ✅ คำนวณ national total ของแต่ละโรคทั้งประเทศ
    const diseaseTotals: Record<string, number> = {};
    data.forEach((province: any) => {
      province.diseases?.forEach((d: any) => {
        diseaseTotals[d.diseaseName] = (diseaseTotals[d.diseaseName] || 0) + d.count;
      });
    });

    res.status(200).json({
      success: true,
      risk,
      disease: disease || null,
      diseaseTotals, // ✅ national totals ให้ frontend คำนวณ %
      data,
    });
  } catch (error) {
    console.error("Get Province Disease Data Error:", error);
    res.status(500).json({ success: false, message: "เกิดข้อผิดพลาดในระบบ" });
  }
};