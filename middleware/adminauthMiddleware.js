import jwt from "jsonwebtoken";

const adminauthMiddleware = (req, res, next) => {
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

export default adminauthMiddleware;



// import jwt from "jsonwebtoken";

// // Admin Auth Middleware
// const adminauthMiddleware = (req, res, next) => {
//   try {
//     // Get token from header
//     const authHeader = req.headers["authorization"] || req.headers["Authorization"];
//     if (!authHeader) {
//       return res.status(401).json({ message: "Access denied. No token provided." });
//     }

//     // Remove "Bearer " if present
//     const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : authHeader;

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Attach admin info to request
//     req.admin = decoded;

//     // Continue to next middleware
//     next();
//   } catch (error) {
//     console.error("JWT Error:", error);
//     return res.status(403).json({ message: "Invalid or expired token." });
//   }
// };

// export default adminauthMiddleware;


