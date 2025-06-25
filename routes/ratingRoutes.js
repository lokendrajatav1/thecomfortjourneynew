import express from "express";
import { submitRating } from "../controllers/ratingController.js";

const router = express.Router();

router.post("/submit", submitRating);

export default router;
