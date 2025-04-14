import express from "express";
import { registerAdmin, loginAdmin, getAdminDashboard, verifyToken } from "../controllers/adminController.js";
import authMiddleware from "../middleware/authMiddleware.js"; 

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.post("/verify-token", authMiddleware, verifyToken);
router.get("/dashboard", authMiddleware, getAdminDashboard);

export default router;
