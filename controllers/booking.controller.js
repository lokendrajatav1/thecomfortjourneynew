

// controllers/bookingController.js
import Booking from "../models/carbookingnow.model.js";

export const getAllBookings = async (req, res) => {
  const bookings = await Booking.find().populate("carId");
  res.json(bookings);
};

export const bookCar = async (req, res) => {
  const booking = new Booking(req.body);
  await booking.save();
  res.status(201).json(booking);
};

export const updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await Booking.findByIdAndUpdate(id, { status }, { new: true });
  res.json(updated);
};
