import Skill from "../../models/skill.js";
import { updateSkillSchema } from "../../validation/skillValidation.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        let iconImage = req.body.iconImage || "";

        // Validate request
        const { error, value } = await updateSkillSchema.validate(req.body);
        if (error) {
            return res.validationError({ message: error.details[0].message });
        }

        // Get uploaded image path
        const newIconImagePath = req.file ? `/uploads/skills/${req.file.filename}` : null;

        const updateData = { ...value };

        if (newIconImagePath) {
            updateData.iconImage = newIconImagePath;
        } else {
            updateData.iconImage = iconImage;
        }

        // Update skill
        const updatedSkill = await Skill.findByIdAndUpdate(
            { _id: id, user: req.user.id },
            updateData,
            { new: true }
        );

        if (!updatedSkill) {
            return res.recordNotFound({ message: "Skill not found" });
        }

        return res.success({
            message: "Skill updated successfully",
            data: updatedSkill,
        });

    } catch (error) {
        console.error("Update Skill Error:", error);
        return res.internalServerError({
            message: "Failed to update skill",
            data: { errors: error.message },
        });
    }
};