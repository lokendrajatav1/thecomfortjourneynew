

// // models/bookingSchema.js
// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     fromCity: { type: String, required: true },
//     toCity: { type: String, required: true },
//     carName: { type: String, required: true },
//     mobile: {
//       type: String,
//       required: true,
//       match: [/^\d{10}$/, "Mobile number must be 10 digits"],
//     },
//    bookAt: { 
//       type: String, // ✅ Fixed here
//       enum: ["hour", "daily", "weekly", "monthly"], 
//       required: true 
//     },
//     pickDate: { type: Date, required: true },
//     pickTime: { type: String, required: true },
//     dropDate: { type: Date, required: true },
//     dropTime: { type: String, required: true },
//     status: {
//       type: String,
//       enum: ["Pending", "Approved", "Rejected", "Canceled", "Completed"],
//       default: "Pending",
//     },
//     adminRemarks: { type: String },
//     cancelReason: { type: String },
//   },
//   { timestamps: true }
// );

// // Optional: Index for faster queries
// bookingSchema.index({ userId: 1 });
// bookingSchema.index({ status: 1 });

// export default mongoose.model("Booking", bookingSchema);
