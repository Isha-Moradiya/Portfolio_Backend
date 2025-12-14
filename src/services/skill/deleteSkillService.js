import Skill from "../../models/skill.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await Skill.findOneAndDelete({
            _id: id,
            user: req.user.id
        });

        if (!skill)
            return res.recordNotFound({ message: "Skill not found" });

        return res.success({
            message: "Skill deleted successfully",
            data: skill,
        });

    } catch (error) {
        console.error("Delete Skill Error:", error);
        return res.internalServerError({
            message: "Failed to delete skill",
            data: { errors: error.message },
        });
    }
};