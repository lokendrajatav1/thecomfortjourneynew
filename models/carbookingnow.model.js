

// models/Booking.js
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  name: String,
  phone: String,
  license: String,
  carId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Car"
  },
  status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending"
  }
}, { timestamps: true });

export default mongoose.model("carbookingnow", bookingSchema);

