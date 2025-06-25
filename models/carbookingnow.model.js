// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema({
//   // userId: {
//   //     type: mongoose.Schema.Types.ObjectId,
//   //     ref: "User",
//   //     required: true,
//   //   },
//   name: String,
//   phone: String,
//   license: String,
//   carId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Car"
//   },
//   status: {
//     type: String,
//     enum: ["Pending", "Accepted", "Rejected"],
//     default: "Pending"
//   }
// }, { timestamps: true });

// export default mongoose.model("carbookingnow", bookingSchema);

// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
//     name: { type: String, required: true },
//     phone: { type: String, required: true, match: /^[6-9]\d{9}$/ },
//     license: { type: String, required: true },
//     carId: { type: mongoose.Schema.Types.ObjectId, ref: "Car", required: true },
//     pickupDate: String,
//     pickupTime: String,
//     dropDate: String,
//     dropTime: String,
//     bookFor: { type: String, enum: ["12 Hours", "Daily", "Weekly", "Monthly"], default: "12 Hours" },
//     status: { type: String, enum: ["Pending", "Accepted", "Rejected", "Canceled"], default: "Pending" },
//     adminRemarks: String,
//     cancelReason: String,
//   },
//   { timestamps: true }
// );

// export default mongoose.model("carbookingnow", bookingSchema);



import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // for guest booking support
    },
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      match: [/^\+?[1-9]\d{9,14}$/, "Phone number must be valid"]
    },
    license: {
      type: String,
      required: true,
    },
    carId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Car",
      required: true,
    },
    pickupDate: String,
    pickupTime: String,
    dropDate: String,
    dropTime: String,
    bookFor: {
      type: String,
      enum: ["12 Hours", "Daily", "Weekly", "Monthly"],
      default: "12 Hours",
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Rejected", "Canceled"],
      default: "Pending",
    },
    adminRemarks: String,
    cancelReason: String,
  },
  { timestamps: true }
);

export default mongoose.model("carbookingnow", bookingSchema);
