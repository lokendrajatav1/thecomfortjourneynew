// import mongoose from 'mongoose';

// const userSchema = new mongoose.Schema({
//     phone: { type: String, required: true, unique: true },
//     otp: { type: String },
//     name: { type: String },
//     isVerified: { type: Boolean, default: false }
// }, { timestamps: true });

// const User = mongoose.model('User', userSchema);
// export default User;

// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     phone: { type: String, required: true, unique: true },
//     otp: { type: String },
//     name: { type: String },
//     image: { type: String }, // New field for profile image
//     isVerified: { type: Boolean, default: false },
//     resendAfter: { type: Date }, // for cooldown timer
//     otpAttempts: { type: Number, default: 0 }, // optional retry limiter
//     otpExpiresAt: { type: Date }, // optional expiry
//   },
//   { timestamps: true }
// );

// const User = mongoose.model("User", userSchema);
// export default User;



// models/userSchema.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    match: [/^\+?[1-9]\d{9,14}$/, "Phone number must be valid"]

    },
    otp: { type: String },
    name: { type: String, trim: true },
    profilePic: {
      type: String,
      default: "/uploads/profile/default-profile.png",
    },
    email: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    address: { type: String, trim: true },
    dob: { type: Date },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
    },
    isVerified: { type: Boolean, default: false },
    resendAfter: { type: Date },
    otpAttempts: { type: Number, default: 0 },
    otpExpiresAt: { type: Date },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
