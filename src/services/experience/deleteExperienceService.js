import Experience from "../../models/experience.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        const deletedExp = await Experience.findOneAndDelete({
            _id: id,
            user: req.user.id
        });

        if (!deletedExp)
            return res.recordNotFound({ message: "Experience not found" });

        return res.success({
            message: "Experience deleted successfully",
            data: deletedExp
        });

    } catch (error) {
        console.error("Delete Experience Error:", error);
        return res.internalServerError({
            message: "Failed to delete experience",
            data: { errors: error.message }
        });
    }
};
