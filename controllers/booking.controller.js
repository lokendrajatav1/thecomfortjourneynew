



import Booking from "../models/carbookingnow.model.js";
import Notification from "../models/notificationModel.js";

// @desc    Get all bookings (Admin)
// @route   GET /api/v1/bookingsnew/all
// @access  Admin
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate("carId").sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings", error });
  }
};

// @desc    Get all public booking statuses
// @route   GET /api/v1/bookingsnew/public
// @access  Public
export const getPublicBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .select("carId status") // 🔒 Select only carId and status
      .populate("carId", "name image") // Populate only car name and image
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch public bookings", error });
  }
};





export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.userId })
      .populate("carId")
      .sort({ createdAt: -1 });

    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user bookings", error });
  }
};




export const bookCar = async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      userId: req.userId,
    });

    await booking.save();

    // ✅ Populate carId to access car name
    await booking.populate("carId");

    const carName = booking.carId?.name || "a car";

    // ✅ Create notification if status is Pending
    if (booking.status === "Pending") {
      await Notification.create({
        userId: req.userId,
        message: `⏳ Your booking for ${carName} is currently *Pending*. Please wait for admin approval.`,
      });
    }

    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("❌ Booking error:", error);
    res.status(400).json({ message: "Booking creation failed", error });
  }
};





export const cancelBooking = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const booking = await Booking.findOne({ _id: id, userId: req.user._id }).populate("carId");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found or not authorized" });
    }

    booking.status = "Canceled";
    booking.cancelReason = reason;
    await booking.save();

    // ✅ Send cancellation notification
    const carName = booking.carId?.name || "a car";
    const message = `⚠️ Your booking for ${carName} has been *Canceled*. ${reason || "No reason provided."}`;

    await Notification.create({
      userId: req.user._id,
      message,
    });

    res.json({ message: "Booking cancelled successfully", booking });
  } catch (error) {
    console.error("❌ Cancel Booking Error:", error);
    res.status(400).json({ message: "Cancellation failed", error });
  }
};




export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status, adminRemarks, cancelReason } = req.body;

  try {
    const updated = await Booking.findByIdAndUpdate(
      id,
      { status, adminRemarks, cancelReason },
      { new: true }
    ).populate("userId carId");

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // ✅ Send notification based on updated status
    if (updated.userId) {
      let message = "";
      if (status === "Accepted") {
        message = `🎉 Your booking for ${updated.carId?.name || "a car"} has been *Accepted*!`;
      } else if (status === "Rejected") {
        message = `❌ Your booking for ${updated.carId?.name || "a car"} has been *Rejected*. ${adminRemarks || ""}`;
      } else if (status === "Canceled") {
        message = `⚠️ Your booking for ${updated.carId?.name || "a car"} has been *Canceled*. ${cancelReason || ""}`;
      }
       else if (status === "Pending") {
        message = `⏳ Your booking for ${updated.carId?.name || "a car"} is currently *Pending*. Please wait for admin approval.`;
      }
      else if (status === "Completed") {
      message = `✅ Your booking for ${updated.carId?.name} has been *Completed*. Thank you for using our service! 🙌`;
    }
      

      if (message) {
        await Notification.create({
          userId: updated.userId._id,
          message,
        });
      }
    }

    res.json({ message: "Booking updated", booking: updated });
  } catch (error) {
    res.status(400).json({ message: "Failed to update booking status", error });
  }
};
