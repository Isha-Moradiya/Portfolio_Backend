import Work from "../../models/work.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        const work = await Work.findById(id).populate("user", "name email");

        if (!work)
            return res.recordNotFound({ message: "Work not found" });

        return res.success({
            message: "Work retrieved successfully",
            data: work,
        });

    } catch (error) {
        console.error("Get Work Error:", error);
        return res.internalServerError({
            message: "Failed to retrieve work",
            data: { errors: error.message },
        });
    }
};
