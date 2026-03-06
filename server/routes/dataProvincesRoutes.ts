import { Router } from "express";
import { getDataProvince, getDataProvinceMap, getDataProvinceCount } from "../controllers/dataProvincesController";

const router = Router();

router.get("/", getDataProvince);
router.get("/map",getDataProvinceMap);
router.get("/count", getDataProvinceCount);
// router.get("/:id", getProvinceById);

export default router;
