import express from 'express';
import {
  sendOTP,
  resendOTP,
  verifyOTP,
  logout,
  sendEmailOTP,
  verifyEmailOTP,
  resendEmailOTP,
} from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { otpRateLimiter } from '../middleware/otpRateLimiter.js';

const router = express.Router();

// 📱 Phone-based OTP routes
router.post('/send-otp', otpRateLimiter, sendOTP);
router.post('/resend-otp', otpRateLimiter, resendOTP);
router.post('/verify-otp', verifyOTP);

// 📧 Email-based OTP routes
router.post('/send-email-otp', otpRateLimiter, sendEmailOTP);
router.post('/resend-email-otp', otpRateLimiter, resendEmailOTP);
router.post('/verify-email-otp', verifyEmailOTP);

// 🔓 Logout
router.post('/logout', authMiddleware, logout);

export default router;
