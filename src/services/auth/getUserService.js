import { ROLE } from "../../constants/databaseEnums.js";
import User from "../../models/user.js";
import jwt from "jsonwebtoken";

export default async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.user.id, role: ROLE.ADMIN });
        if (!user) {
            return res.recordNotFound({ message: "User not found" });
        }

        const tokenPayload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        return res.success({
            message: "Get user data successfully",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    phone: user.phone || "",
                    address: user.address || "",
                    role: user.role,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            },
        });
    } catch (error) {
        console.log("🚀 ~ error:", error)
        return res.internalServerError({
            message: "User verification failed",
            data: { errors: error.message },
        });
    }
};
