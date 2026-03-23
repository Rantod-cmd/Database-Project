import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

import provinceRoutes from "./routes/provinceRoutes";
import authRoutes from "./routes/authRoutes";
import hospitalRoutes from "./routes/hospitalRoutes";
import reportRoutes from "./routes/reportRoutes";
import dataProvincesRoutes from "./routes/dataProvincesRoutes";
app.use("/api/provinces", provinceRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hospital", hospitalRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/dataProvince", dataProvincesRoutes);

export default app;
