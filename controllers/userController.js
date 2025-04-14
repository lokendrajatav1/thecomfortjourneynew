const User = require('../models/User');

exports.sendOtp = async (req, res) => {
  const { phone, name } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  let user = await User.findOne({ phone });

  if (!user) {
    user = new User({ phone, name, otp });
  } else {
    user.otp = otp;
    user.name = name;
  }

  await user.save();
  console.log(`OTP for ${phone}: ${otp}`);
  res.json({ message: 'OTP sent (check console)' });
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  const user = await User.findOne({ phone, otp });

  if (!user) return res.status(400).json({ message: 'Invalid OTP' });

  res.json({ userId: user._id, name: user.name });
};
