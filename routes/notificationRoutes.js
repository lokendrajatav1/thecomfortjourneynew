import express from "express";
import {
  getUserNotifications,
  markAllAsRead,
  deleteNotification,
  clearAllNotifications,
} from "../controllers/notificationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// GET user's notifications
router.get("/user", authMiddleware, getUserNotifications);

// PUT mark all as read
router.put("/mark-all-read", authMiddleware, markAllAsRead);

// DELETE all notifications — MUST come before /:id
router.delete("/clear-all", authMiddleware, clearAllNotifications);

// DELETE individual notification
router.delete("/:id", authMiddleware, deleteNotification);

export default router;
