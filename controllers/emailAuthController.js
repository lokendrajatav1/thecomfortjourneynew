// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";
// import { generateOTP, sendOTPEmail } from "../utils/emailService.js";

// const JWT_SECRET = process.env.JWT_SECRET || "secretkey";

// // 📩 Send OTP to email
// export const sendEmailOTP = async (req, res) => {
//   const { email, name, phone } = req.body;

//   if (!email) return res.status(400).json({ message: "Email is required" });

//   const otp = generateOTP();
//   const hashedOtp = await bcrypt.hash(otp, 10);
//   const now = new Date();

//   let user = await User.findOne({ email });

//   if (!user) {
//     user = new User({
//       email,
//       name: name?.trim() || "User",
//       phone: phone || "",
//       otp: hashedOtp,
//       otpExpiresAt: new Date(now.getTime() + 5 * 60000),
//       resendAfter: new Date(now.getTime() + 30 * 1000),
//       otpAttempts: 0,
//     });
//   } else {
//     if (user.resendAfter && user.resendAfter > now) {
//       const waitTime = Math.ceil((user.resendAfter - now) / 1000);
//       return res.status(429).json({ message: `Wait ${waitTime}s to request OTP again.` });
//     }

//     user.otp = hashedOtp;
//     user.otpExpiresAt = new Date(now.getTime() + 5 * 60000);
//     user.resendAfter = new Date(now.getTime() + 30 * 1000);
//     user.otpAttempts = 0;
//     if (!user.name && name) user.name = name.trim();
//     if (!user.phone && phone) user.phone = phone;
//   }

//   await user.save();
//   await sendOTPEmail(email, otp);

//   res.status(200).json({ message: "OTP sent to your email" });
// };

// // ♻️ Resend OTP
// export const resendEmailOTP = async (req, res) => {
//   const { email } = req.body;

//   if (!email) return res.status(400).json({ message: "Email is required" });

//   const user = await User.findOne({ email });
//   if (!user) return res.status(404).json({ message: "User not found" });

//   const now = new Date();
//   if (user.resendAfter && user.resendAfter > now) {
//     const waitTime = Math.ceil((user.resendAfter - now) / 1000);
//     return res.status(429).json({ message: `Wait ${waitTime}s to resend OTP.` });
//   }

//   const otp = generateOTP();
//   user.otp = await bcrypt.hash(otp, 10);
//   user.otpExpiresAt = new Date(now.getTime() + 5 * 60000);
//   user.resendAfter = new Date(now.getTime() + 30 * 1000);
//   user.otpAttempts = 0;

//   await user.save();
//   await sendOTPEmail(email, otp);

//   res.status(200).json({ message: "OTP resent successfully" });
// };

// // ✅ Verify OTP
// export const verifyEmailOTP = async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

//   const user = await User.findOne({ email });
//   if (!user || !user.otp || !user.otpExpiresAt)
//     return res.status(401).json({ message: "Invalid request" });

//   const now = new Date();
//   if (user.otpExpiresAt < now)
//     return res.status(400).json({ message: "OTP expired" });

//   if (user.otpAttempts >= 5)
//     return res.status(429).json({ message: "Too many attempts. Please resend OTP." });

//   const isMatch = await bcrypt.compare(otp.trim(), user.otp);
//   if (!isMatch) {
//     user.otpAttempts += 1;
//     await user.save();
//     return res.status(401).json({ message: "Invalid OTP" });
//   }

//   user.isVerified = true;
//   user.otp = null;
//   user.otpExpiresAt = null;
//   user.resendAfter = null;
//   user.otpAttempts = 0;

//   await user.save();

//   const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
//     expiresIn: "7d",
//   });

//   res.status(200).json({
//     token,
//     user: {
//       _id: user._id,
//       email: user.email,
//       name: user.name,
//       phone: user.phone || "",
//       isVerified: user.isVerified,
//       profilePic: user.profilePic || "/uploads/default-profile.png",
//     },
//   });
// };
