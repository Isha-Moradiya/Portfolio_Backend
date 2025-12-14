import User from "../../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { loginSchema } from "../../validation/authValidation.js";
import { ROLE } from "../../constants/databaseEnums.js";

export default async (req, res) => {
    try {
        // Validate request
        const { error, value } = await loginSchema.validate(req.body);
        if (error) {
            return res.validationError({ message: error.details[0].message });
        }

        const { email, password } = value;

        // Find admin user - explicitly check for admin role
        const user = await User.findOne({ email, role: ROLE.ADMIN });

        if (!user) {
            return res.unAuthorized({
                message: "Invalid email or password",
            });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.unAuthorized({
                message: "Invalid email or password",
            });
        }

        // Create JWT token
        const tokenPayload = {
            id: user._id,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "30d",
        });

        // Final response
        return res.success({
            message: "Login successful",
            data: {
                token,
                user: {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    phone: user.phone,
                    location: user.location,
                    responseTime: user.responseTime,
                    title: user.title,
                    subtitle: user.subtitle,
                    description: user.description,
                    strengths: user.strengths,
                    heroImage: user.heroImage,
                    aboutImage: user.aboutImage,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        return res.internalServerError({
            message: "Login failed",
            data: { errors: error.message },
        });
    }
};