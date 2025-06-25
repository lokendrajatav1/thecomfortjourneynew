// import express from "express";
// import { createBooking, getBookings, getMyBookings, updateBookingStatus } from "../controllers/bookingController.js";
// import authMiddleware from "../middleware/authMiddleware.js";



// const router = express.Router();

// router.post("/add",createBooking);
// router.get("/", getBookings);
// router.put("/:id",updateBookingStatus);
// router.get("/my", authMiddleware, getMyBookings); // <--- ✅ this is critical

// export default router;


import express from "express";
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
  cancelBooking,
} from "../controllers/bookingController.js";
import {authMiddleware} from "../middleware/authMiddleware.js";
import adminauthMiddleware from "../middleware/adminauthMiddleware.js";

const router = express.Router();

// User routes
router.post("/", authMiddleware, createBooking);
router.get("/my", authMiddleware, getMyBookings);
router.put("/cancel/:id", authMiddleware, cancelBooking);

// Admin routes
router.get("/all", getAllBookings);
router.put("/status/:id",updateBookingStatus);

export default router;
