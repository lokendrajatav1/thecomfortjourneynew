


import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateOTP, sendOTP as sendOTPtoPhone } from '../utils/otpService.js';
import { sendOTPEmail } from '../utils/otpService.js'; // 👈 sendOTPEmail is a new helper

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// 🔐 Normalize phone number
const normalizePhone = (phone) => {
  const raw = phone.replace(/\D/g, "");
  return raw.length === 10 ? "+91" + raw : "+" + raw;
};

// ✅ Send OTP
export const sendOTP = async (req, res) => {
  try {
    let { phone, name } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    phone = normalizePhone(phone);
    const otp = generateOTP();
    const now = new Date();

    let user = await User.findOne({ phone });

    const hashedOtp = await bcrypt.hash(otp, 10);

    if (!user) {
      user = new User({
        phone,
        name: name?.trim() || "User",
        otp: hashedOtp,
        otpExpiresAt: new Date(now.getTime() + 5 * 60000), // 5 mins
        resendAfter: new Date(now.getTime() + 30 * 1000), // 30 secs
        otpAttempts: 0,
        isVerified: false,
      });
    } else {
      if (user.resendAfter && user.resendAfter > now) {
        const waitTime = Math.ceil((user.resendAfter - now) / 1000);
        return res.status(429).json({ message: `Wait ${waitTime}s to request OTP again.` });
      }

      user.otp = hashedOtp;
      user.otpExpiresAt = new Date(now.getTime() + 5 * 60000);
      user.resendAfter = new Date(now.getTime() + 30 * 1000);
      user.otpAttempts = 0;
      if (!user.name && name) user.name = name.trim();
    }

    await user.save();
    await sendOTPtoPhone(phone, otp);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Send OTP Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Resend OTP
export const resendOTP = async (req, res) => {
  try {
    let { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone number is required" });

    phone = normalizePhone(phone);
    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: "Invalid request" });

    const now = new Date();
    if (user.resendAfter && user.resendAfter > now) {
      const waitTime = Math.ceil((user.resendAfter - now) / 1000);
      return res.status(429).json({ message: `Wait ${waitTime}s to resend OTP.` });
    }

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);

    user.otp = hashedOtp;
    user.otpExpiresAt = new Date(now.getTime() + 5 * 60000);
    user.resendAfter = new Date(now.getTime() + 30 * 1000);
    user.otpAttempts = 0;

    await user.save();
    await sendOTPtoPhone(phone, otp);

    res.status(200).json({ message: "OTP resent successfully" });
  } catch (err) {
    console.error("Resend OTP Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Verify OTP
export const verifyOTP = async (req, res) => {
  try {
    let { phone, otp, name } = req.body;
    if (!phone || !otp) return res.status(400).json({ message: "Phone and OTP required" });

    phone = normalizePhone(phone);
    const user = await User.findOne({ phone });
    if (!user || !user.otp || !user.otpExpiresAt) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.otpAttempts >= 5) {
      return res.status(429).json({ message: "Too many attempts. Please resend OTP." });
    }

    const now = new Date();
    if (user.otpExpiresAt < now) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp.trim(), user.otp);
    if (!isMatch) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.isVerified = true;
    if (name) user.name = name.trim();
    user.otp = null;
    user.otpExpiresAt = null;
    user.otpAttempts = 0;
    user.resendAfter = null;

    await user.save();

    const token = jwt.sign(
      { id: user._id, phone: user.phone },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        phone: user.phone,
        name: user.name,
        isVerified: user.isVerified,
        profilePic: user.profilePic || "/uploads/default-profile.png",
      },
    });
  } catch (err) {
    console.error("Verify OTP Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};




// ✅ Send OTP via Email
export const sendEmailOTP = async (req, res) => {
  try {
    const { email, name, phone } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const otp = generateOTP();
    const hashedOtp = await bcrypt.hash(otp, 10);
    const now = new Date();

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        email,
        name: name?.trim() || "User",
        phone: phone || "",
        otp: hashedOtp,
        otpExpiresAt: new Date(now.getTime() + 5 * 60000),
        resendAfter: new Date(now.getTime() + 30 * 1000),
        otpAttempts: 0,
        isVerified: false,
      });
    } else {
      if (user.resendAfter && user.resendAfter > now) {
        const waitTime = Math.ceil((user.resendAfter - now) / 1000);
        return res.status(429).json({ message: `Wait ${waitTime}s to request OTP again.` });
      }

      user.otp = hashedOtp;
      user.otpExpiresAt = new Date(now.getTime() + 5 * 60000);
      user.resendAfter = new Date(now.getTime() + 30 * 1000);
      user.otpAttempts = 0;
      if (!user.name && name) user.name = name.trim();
      if (!user.phone && phone) user.phone = phone;
    }

    await user.save();
    await sendOTPEmail(email, otp); // ✅ Email sending logic

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (err) {
    console.error("Send Email OTP Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Verify OTP from Email
export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ message: "Email and OTP required" });

    const user = await User.findOne({ email });
    if (!user || !user.otp || !user.otpExpiresAt) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (user.otpAttempts >= 5) {
      return res.status(429).json({ message: "Too many attempts. Please resend OTP." });
    }

    const now = new Date();
    if (user.otpExpiresAt < now) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const isMatch = await bcrypt.compare(otp.trim(), user.otp);
    if (!isMatch) {
      user.otpAttempts += 1;
      await user.save();
      return res.status(401).json({ message: "Invalid credentials" });
    }

    user.isVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    user.otpAttempts = 0;
    user.resendAfter = null;

    await user.save();

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isVerified: user.isVerified,
        profilePic: user.profilePic || "/uploads/default-profile.png",
      },
    });
  } catch (err) {
    console.error("Verify Email OTP Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const resendEmailOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();
    if (user.resendAfter && user.resendAfter > now) {
      const waitTime = Math.ceil((user.resendAfter - now) / 1000);
      return res.status(429).json({ message: `Wait ${waitTime}s to resend OTP.` });
    }

    const otp = generateOTP();
    user.otp = await bcrypt.hash(otp, 10);
    user.otpExpiresAt = new Date(now.getTime() + 5 * 60000);
    user.resendAfter = new Date(now.getTime() + 30 * 1000);
    user.otpAttempts = 0;

    await user.save();
    await sendOTPEmail(email, otp);

    res.status(200).json({ message: "OTP resent to email" });
  } catch (err) {
    console.error("Resend Email OTP Error:", err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Logout (Stateless)
export const logout = async (req, res) => {
  res.status(200).json({ message: "Logout successful. Please clear token from client." });
};
