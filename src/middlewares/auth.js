import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const isAuthenticated = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.unAuthorized({
            success: false,
            message: "No token provided",
        });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);

        if (!user) {
            return res.notFound({
                success: false,
                message: "User not found",
            });
        }

        req.user = user; // store logged-in user
        next();
    } catch (err) {
        return res.unAuthorized({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
