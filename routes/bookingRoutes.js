const express = require("express");
const { createBooking, getBookings, updateBookingStatus } = require("../controllers/bookingController");
const { default: authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add",createBooking);
router.get("/", getBookings);
router.put("/:id",updateBookingStatus);

module.exports = router;
