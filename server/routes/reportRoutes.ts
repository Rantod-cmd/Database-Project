import { Router } from "express";
import { postReport } from "../controllers/reportController";
import { optionalAuth } from "../middleware/authMiddleware";

const router = Router();

router.post("/", optionalAuth, postReport);

export default router;
