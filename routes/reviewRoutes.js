import express from "express";
import {
  addReview,
  getReviews,
  updateReviewStatus,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

router.post("/add", addReview);
router.get("/", getReviews); // Optional: /?status=Accepted
router.put("/status/:id", updateReviewStatus); // Accept/Reject
router.put("/update/:id", updateReview); // Edit content
router.delete("/delete/:id", deleteReview);

export default router;
