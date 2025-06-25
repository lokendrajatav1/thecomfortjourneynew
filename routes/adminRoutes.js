import express from "express";
import { registerAdmin, loginAdmin, getAdminDashboard, verifyToken } from "../controllers/adminController.js";
import adminauthMiddleware from "../middleware/adminauthMiddleware.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/verify-token", adminauthMiddleware, verifyToken);
router.get("/dashboard", adminauthMiddleware, getAdminDashboard);

export default router;
