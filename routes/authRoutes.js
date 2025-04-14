// const express = require("express");
// const User = require("../models/User");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const router = express.Router();

// // Register User
// router.post("/register", async (req, res) => {
//     try {
//         const { name, email, phone, password } = req.body;

//         if (!name || !email || !phone || !password) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ error: "Email already exists" });
//         }

//         const newUser = new User({ name, email, phone, password });
//         await newUser.save();

//         res.status(201).json({ message: "User registered successfully!" });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// // Login User
// router.post("/login", async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         if (!email || !password) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         const user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({ error: "Invalid email or password" });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ error: "Invalid email or password" });
//         }

//         const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

//         res.json({ message: "Login successful", token });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// // Forgot Password
// router.post("/forgot-password", async (req, res) => {
//     try {
//         const { email } = req.body;
//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(404).json({ error: "Email not found" });
//         }

//         // Generate a new random password (for simplicity)
//         const newPassword = Math.random().toString(36).slice(-8);
//         user.password = await bcrypt.hash(newPassword, 10);
//         await user.save();

//         res.json({ message: "Your new password is: " + newPassword });
//     } catch (error) {
//         res.status(500).json({ error: "Server error" });
//     }
// });

// module.exports = router;
