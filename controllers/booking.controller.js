

// // controllers/bookingController.js
// import Booking from "../models/carbookingnow.model.js";

// export const getAllBookings = async (req, res) => {
//   const bookings = await Booking.find().populate("carId");
//   res.json(bookings);
// };

// export const bookCar = async (req, res) => {
//   const booking = new Booking(req.body);
//   await booking.save();
//   res.status(201).json(booking);
// };

// export const updateBookingStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status } = req.body;
//   const updated = await Booking.findByIdAndUpdate(id, { status }, { new: true });
//   res.json(updated);
// };


// controllers/bookingController.js
// import Booking from "../models/carbookingnow.model.js";

// // @desc    Get all bookings with car data
// // @route   GET /api/v1/bookingsnew/all
// // @access  Admin
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate("carId").sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch bookings", error });
//   }
// };

// // @desc    Create a new booking
// // @route   POST /api/v1/bookingsnew/book
// // @access  Public
// export const bookCar = async (req, res) => {
//   try {
//     const newBooking = new Booking(req.body);
//     await newBooking.save();
//     res.status(201).json({ message: "Booking created successfully", booking: newBooking });
//   } catch (error) {
//     res.status(400).json({ message: "Booking creation failed", error });
//   }
// };

// // @desc    Update booking status (Admin Accept/Reject/Cancel)
// // @route   PUT /api/v1/bookingsnew/status/:id
// // @access  Admin
// export const updateBookingStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status, adminRemarks, cancelReason } = req.body;

//   try {
//     const updated = await Booking.findByIdAndUpdate(
//       id,
//       { status, adminRemarks, cancelReason },
//       { new: true }
//     );

//     if (!updated) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.json({ message: "Booking updated", booking: updated });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to update booking status", error });
//   }
// };




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

// @desc    Get bookings of the logged-in user
// @route   GET /api/v1/bookingsnew/my
// @access  Private
// export const getMyBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ userId: req.user._id }).populate("carId").sort({ createdAt: -1 });
//     res.json({ bookings });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch your bookings", error });
//   }
// };



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

// @desc    Book a car
// @route   POST /api/v1/bookingsnew/book
// @access  Public or Private (depending on your policy)
// export const bookCar = async (req, res) => {
//   try {
//     const booking = new Booking({
//       ...req.body,
//       userId: req.userId, // ✅ always available from authMiddleware
//     });

//     await booking.save();
//     res.status(201).json({ message: "Booking created successfully", booking });
//   } catch (error) {
//     res.status(400).json({ message: "Booking creation failed", error });
//   }
// };


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

// @desc    Cancel a booking (User)
// @route   PUT /api/v1/bookingsnew/cancel/:id
// @access  Private
// export const cancelBooking = async (req, res) => {
//   const { id } = req.params;
//   const { reason } = req.body;

//   try {
//     const booking = await Booking.findOne({ _id: id, userId: req.user._id });

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found or not authorized" });
//     }

//     booking.status = "Canceled";
//     booking.cancelReason = reason;
//     await booking.save();

//     res.json({ message: "Booking cancelled successfully", booking });
//   } catch (error) {
//     res.status(400).json({ message: "Cancellation failed", error });
//   }
// };



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

// @desc    Update booking status (Admin)
// @route   PUT /api/v1/bookingsnew/status/:id
// @access  Admin
// export const updateBookingStatus = async (req, res) => {
//   const { id } = req.params;
//   const { status, adminRemarks, cancelReason } = req.body;

//   try {
//     const updated = await Booking.findByIdAndUpdate(
//       id,
//       { status, adminRemarks, cancelReason },
//       { new: true }
//     ).populate("userId carId");

//     if (!updated) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // ✅ Send notification if booking is accepted
//     if (status === "Accepted" && updated.userId) {
//       await Notification.create({
//         userId: updated.userId._id,
//         message: `🎉 Your booking for ${updated.carId?.name || "a car"} has been *Accepted*!`,
//       });
//     }

//     res.json({ message: "Booking updated", booking: updated });
//   } catch (error) {
//     res.status(400).json({ message: "Failed to update booking status", error });
//   }
// };



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
