import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Users from "../Models/user.schema.js";

dotenv.config();

const authMiddleware = (userRole) => async (req, res, next) => {
    // Extract token from the Authorization header (Bearer <token>)
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Token is missing or invalid" });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Check if user exists in the database
        const user = await Users.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the user's role matches the required role
        if (user.role !== userRole) {
            return res.status(401).json({ message: "Access denied: Insufficient permissions" });
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        console.error(error);

        // Handle invalid or expired token errors
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        }

        // Handle expired token errors
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token has expired" });
        }

        // Generic server error handling
        return res.status(500).json({ message: "Internal server error" });
    }
};

export default authMiddleware;
