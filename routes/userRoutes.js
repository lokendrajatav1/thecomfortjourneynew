import express from "express";
import {
  bulkDeleteUsers,
  deleteUser,
  getAllUsers,
  getProfile,
//   updateProfileInfo,
//   updateProfilePicture,
  updateUserProfile,
} from "../controllers/userController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
// router.put('/auth/update-profile', protect, updateProfileInfo);
// router.put('/profile', protect, upload.single("profilePic"), updateProfilePicture);

router.put(
  "/auth/update-profile",
  authMiddleware,
  upload.single("profilePic"),
  updateUserProfile
);

// Admin route to get all users
router.get("/all", getAllUsers);

// DELETE a single user
router.delete("/:id", deleteUser);

// ✅ Bulk delete users
router.post("/bulk-delete", bulkDeleteUsers);

export default router;
