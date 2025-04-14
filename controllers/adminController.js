import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "../models/admin/Admin.js";

// Register Admin
export const registerAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        let admin = await Admin.findOne({ email });
        if (admin) return res.status(400).json({ message: "Admin already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        admin = new Admin({ email, password: hashedPassword });
        await admin.save();

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Login Admin
export const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, admin });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

// Verify Token
export const verifyToken = (req, res) => {
    res.json({ message: "Token is valid", admin: req.admin });
};

// Get Admin Dashboard (Protected Route)
export const getAdminDashboard = (req, res) => {
    res.json({ message: "Welcome to Admin Dashboard" });
};
