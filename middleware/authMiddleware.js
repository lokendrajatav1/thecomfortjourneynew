// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

// export const authMiddleware = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader?.startsWith("Bearer ")) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-otp -otpExpiresAt -otpAttempts');
//     if (!user) return res.status(401).json({ message: 'User not found' });

//     req.user = user;
//     next();
//   } catch (err) {
//     return res.status(403).json({ message: 'Invalid or expired token' });
//   }
// };

// export default authMiddleware;



import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET); // Throws if invalid or expired

    const user = await User.findById(decoded.id).select('-otp -otpExpiresAt -otpAttempts');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    req.userId = user._id; // 👈 Used in controller for booking
    req.user = user;       // Full user object (if needed elsewhere)

    next();
  } catch (err) {
    return res.status(403).json({
      message: err.name === 'TokenExpiredError' ? 'Token expired' : 'Invalid token',
      error: err.message,
    });
  }
};

export default authMiddleware;
