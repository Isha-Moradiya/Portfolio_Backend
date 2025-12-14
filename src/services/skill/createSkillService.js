import Skill from "../../models/skill.js";
import { createSkillSchema } from "../../validation/skillValidation.js";

export default async (req, res) => {
    try {
        // Validate request
        const { error, value } = await createSkillSchema.validate(req.body);
        if (error) {
            return res.validationError({ message: error.details[0].message });
        }

        const iconImagePath = req.file ? `/uploads/skills/${req.file.filename}` : null;

        // Create skill
        const newSkill = new Skill({
            ...value,
            user: req.user.id,
            iconImage: iconImagePath,
            isActive: true
        });

        const skill= await newSkill.save();

        return res.success({
            message: "Skill created successfully",
            data: skill,
        });

    } catch (error) {
        console.error("Create Skill Error:", error);
        return res.internalServerError({
            message: "Failed to create skill",
            data: { errors: error.message },
        });
    }
};