import jwt from "jsonwebtoken";

const adminauthMiddleware = (req, res, next) => {
  const authHeader = req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Extract token from "Bearer <token>"
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Ensure the token is for an admin
    if (!decoded.adminId) {
      return res.status(403).json({ message: "Access denied. Not an admin." });
    }

    req.admin = decoded; // Store admin info in request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};

export default adminauthMiddleware;
