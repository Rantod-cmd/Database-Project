import { Router } from "express";
import { getDataProvince } from "../controllers/dataProvincesController";

const router = Router();

router.get("/", getDataProvince);

export default router;
