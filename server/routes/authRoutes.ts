import { Router } from "express";
import { optionalAuth } from "../middleware/authMiddleware";
import { Login, checkMe } from "../controllers/authController";

const router = Router()

router.post('/', (req, res, next) => {
    next();
}, Login)

router.get('/checkMe', (req, res, next) => {
    next();
}, optionalAuth, checkMe)

export default router;