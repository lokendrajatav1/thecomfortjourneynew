import rateLimit from 'express-rate-limit';

export const otpRateLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // limit each IP to 5 OTP requests per 10 minutes
  message: {
    message: "Too many OTP requests from this IP. Please try again later.",
  },
});

export default otpRateLimiter;
