import Skill from "../../models/skill.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        const skill = await Skill.findById(id).populate("user", "name email");

        if (!skill) {
            return res.recordNotFound({ message: "Skill not found" });
        }

        return res.success({
            message: "Skill retrieved successfully",
            data: skill,
        });

    } catch (error) {
        console.error("Get Skill Error:", error);
        return res.internalServerError({
            message: "Failed to retrieve skill",
            data: { errors: error.message },
        });
    }
};