
import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
    {
        fromCity: { type: String, required: true },
        toCity: { type: String, required: true },
        carName: { type: String, required: true },
        mobile: { type: String, required: true },
        bookAt: { type: String, required: true },
        pickDate: { type: String, required: true },
        pickTime: { type: String, required: true },
        dropDate: { type: String, required: true },
        dropTime: { type: String, required: true },
        status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" }
    },
    { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);

