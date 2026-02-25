import { Router } from "express";
import { getProvinces } from "../controllers/provinceController";

const router = Router()

router.get('/',getProvinces)

export default router;