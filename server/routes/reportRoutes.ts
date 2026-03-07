import { Router } from "express";
import { postReport, getRecentReports } from "../controllers/reportController";
import { optionalAuth } from "../middleware/authMiddleware";

const router = Router();

router.get("/recent", getRecentReports);
router.post("/", optionalAuth, postReport);

export default router;
