

// routes/bookingRoutes.js
import express from "express";
const router = express.Router();
import {
  getAllBookings,
  bookCar,
  updateBookingStatus
} from "../controllers/booking.controller.js";

router.get("/all", getAllBookings);
router.post("/book", bookCar);
router.put("/status/:id", updateBookingStatus);

export default router;

