import { ROLE } from "../../constants/databaseEnums.js";
import Portfolio from "../../models/portfolio.js";
import User from "../../models/user.js";
import { portfolioUpdateSchema } from "../../validation/userValidation.js";

export default async (req, res) => {
    try {
        // Validate request body (text fields)
        const { error, value } = await portfolioUpdateSchema.validate(req.body);
        if (error) {
            return res.validationError({ message: error.details[0].message });
        }

        const adminUser = await User.findOne({ role: ROLE.ADMIN });

        if (!adminUser) {
            return res.recordNotFound({
                message: "Admin user not found",
            });
        }

        // Get uploaded file paths from req object (set by multer middleware)
        const heroImagePath = req.file ? `/uploads/portfolio/${req.file.filename}` : null;
        const aboutImagePath = req.file ? `/uploads/portfolio/${req.file.filename}` : null;

        const updateData = { ...value };

        updateData.heroImage = heroImagePath || req.body.heroImage || undefined;
        updateData.aboutImage = aboutImagePath || req.body.aboutImage || undefined;


        const updatedPortfolio = await Portfolio.findOneAndUpdate(
            { userId: adminUser._id },
            updateData,
            { new: true, upsert: true }
        );

        return res.success({
            message: "Portfolio updated successfully",
            data: updatedPortfolio,
        });

    } catch (error) {
        console.error("Update Portfolio Error:", error);
        return res.internalServerError({
            message: "Failed to update portfolio",
            data: { errors: error.message },
        });
    }
};