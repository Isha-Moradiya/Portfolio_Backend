import { ROLE } from "../../constants/databaseEnums.js";
import Portfolio from "../../models/portfolio.js";
import User from "../../models/user.js";

export default async (req, res) => {
    try {
        const adminUser = await User.findOne({ role: ROLE.ADMIN });

        if (!adminUser) {
            return res.recordNotFound({
                message: "Portfolio data not found",
            });
        }

        const portfolio = await Portfolio.findOne({ userId: adminUser._id });
        if (!portfolio) {
            return res.recordNotFound({
                message: "Portfolio data not found",
            });
        }

        return res.success({
            message: "Portfolio data retrieved successfully",
            data: portfolio,
        });

    } catch (error) {
        console.error("Get Portfolio Error:", error);
        return res.internalServerError({
            message: "Failed to retrieve portfolio data",
            data: { errors: error.message },
        });
    }
};