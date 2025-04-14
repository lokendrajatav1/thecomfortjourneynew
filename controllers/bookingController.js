const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json({ message: "Booking successful", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Booking failed", error: error.message });
    }
};

// Get all bookings
const getBookings = async (req, res) => {
    try {
        const bookings = await Booking.find();
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching bookings", error: error.message });
    }
};

// Update booking status
const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!["Accepted", "Rejected"].includes(status)) {
            return res.status(400).json({ message: "Invalid status update" });
        }

        const updatedBooking = await Booking.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true } // ✅ Return updated document
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        res.status(200).json({ message: "Booking updated successfully", booking: updatedBooking });
    } catch (error) {
        res.status(500).json({ message: "Error updating booking", error: error.message });
    }
};

module.exports = { createBooking, getBookings, updateBookingStatus };
