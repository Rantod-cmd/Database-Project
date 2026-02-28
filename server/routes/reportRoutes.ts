import { Router } from "express";
import { postReport } from "../controllers/reportController";

const router = Router();

router.post("/", postReport);

export default router;
