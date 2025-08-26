


// import Booking from "../models/Booking.js";

// // Create a new booking
// export const createBooking = async (req, res) => {
//   try {
//     console.log("📥 Booking Request Body:", req.body);
//     console.log("👤 User ID from Token:", req.userId);

//     const newBooking = new Booking({
//       ...req.body,
//       userId: req.userId,
//     });

//     await newBooking.save();
//     console.log("✅ Booking Saved:", newBooking);

//     res.status(201).json({ message: "Booking successful", booking: newBooking });
//   } catch (error) {
//     console.error("❌ Booking Failed:", error.message);
//     res.status(500).json({ message: "Booking failed", error: error.message });
//   }
// };


// // Get bookings of logged-in user
// export const getMyBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ userId: req.userId }).sort({ pickDate: -1 });
//     res.status(200).json({ bookings });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to fetch bookings" });
//   }
// };

// // Admin: Get all bookings
// export const getAllBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find().populate("userId").sort({ createdAt: -1 });
//     res.status(200).json({ bookings });
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching all bookings", error: error.message });
//   }
// };

// // Admin: Update booking status
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { status, adminRemarks } = req.body;

//     if (!["Approved", "Rejected" ,"Completed" ].includes(status)) {
//       return res.status(400).json({ message: "Invalid status update" });
//     }

//     const updatedBooking = await Booking.findByIdAndUpdate(
//       id,
//       { status, adminRemarks },
//       { new: true }
//     );

//     if (!updatedBooking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     res.status(200).json({ message: "Booking updated", booking: updatedBooking });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating booking", error: error.message });
//   }
// };

// // User: Cancel booking
// export const cancelBooking = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { reason } = req.body;

//     const booking = await Booking.findOne({ _id: id, userId: req.userId });

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     booking.status = "Canceled";
//     booking.cancelReason = reason;
//     await booking.save();

//     res.status(200).json({ message: "Booking canceled", booking });
//   } catch (error) {
//     res.status(500).json({ message: "Failed to cancel booking", error: error.message });
//   }
// };
