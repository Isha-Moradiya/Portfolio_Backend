import Experience from "../../models/experience.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        const exp = await Experience.findById(id).populate("user", "name email");

        if (!exp)
            return res.recordNotFound({ message: "Experience not found" });

        return res.success({
            message: "Experience fetched successfully",
            data: exp
        });

    } catch (error) {
        console.error("Get Experience By ID Error:", error);
        return res.internalServerError({
            message: "Failed to fetch experience",
            data: { errors: error.message }
        });
    }
};
