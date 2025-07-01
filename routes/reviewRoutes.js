import express from "express";
import {
  addReview,
  getAllReviews,
  updateReview,
  updateReviewStatus,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// Correct routes
router.post("/", addReview);
router.get("/", getAllReviews);
router.put("/update/:id", updateReview);
router.put("/status/:id", updateReviewStatus);
router.delete("/delete/:id", deleteReview);

export default router;
