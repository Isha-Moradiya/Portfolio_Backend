import Work from "../../models/work.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        const work = await Work.findOneAndDelete({
            _id: id,
            user: req.user.id,
        });

        if (!work)
            return res.recordNotFound({ message: "Work not found" });

        return res.success({
            message: "Work deleted successfully",
            data: work,
        });

    } catch (error) {
        console.error("Delete Work Error:", error);
        return res.internalServerError({
            message: "Failed to delete work",
            data: { errors: error.message },
        });
    }
};
