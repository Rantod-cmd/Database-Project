import type { Document, Model } from "mongoose";
import type { IReport } from "../../shared/types/schema/report";
import mongoose from "mongoose";

export interface ReportDocument extends Omit<IReport, "_id">, Document {}

const reportSchema = new mongoose.Schema<ReportDocument>({
  hospitalId: { type: String, required: true },
  hospitalName: { type: String, required: true },
  provinceName: { type: String, required: true },
  diseaseId: { type: String, required: true },
  icdCode: { type: String, required: true },
  diseaseName: { type: String, required: true },
  age: { type: Number, required: true },
  sex: { type: String, required: true },
  reportAt: { type: Date, default: Date.now },
});

const ReportModel: Model<ReportDocument> = mongoose.model<ReportDocument>(
  "Report",
  reportSchema,
);
export default ReportModel;
