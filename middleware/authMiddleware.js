import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.admin = decoded; // Store admin info in request
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token." });
    }
};

export default authMiddleware;
