

// // routes/bookingRoutes.js
// import express from "express";
// const router = express.Router();
// import {
//   getAllBookings,
//   bookCar,
//   updateBookingStatus
// } from "../controllers/booking.controller.js";

// router.get("/all", getAllBookings);
// router.post("/book", bookCar);
// router.put("/status/:id", updateBookingStatus);

// export default router;



import express from "express";
const router = express.Router();

import {
  getAllBookings,
  getMyBookings,
  bookCar,
  cancelBooking,
  updateBookingStatus,
} from "../controllers/booking.controller.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import adminauthMiddleware from "../middleware/adminauthMiddleware.js";

// 🧑‍💼 Admin Routes
router.get("/all", getAllBookings);                 // Admin: view all bookings
router.put("/status/:id", updateBookingStatus);     // Admin: update status

// 🙋‍♂️ User Routes
router.get("/my", authMiddleware, getMyBookings);   // User: view own bookings
router.post("/book",authMiddleware, bookCar);                      // User: book a car (login optional)
router.put("/cancel/:id", authMiddleware, cancelBooking);  // User: cancel booking

export default router;
