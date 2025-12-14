import Experience from "../../models/experience.js";
import { createExperienceSchema } from "../../validation/experienceValidation.js";

export default async (req, res) => {
    try {
        const { error, value } = await createExperienceSchema.validate(req.body);
        if (error) {
            return res.validationError({ message: error.details[0].message });
        }

        const newExp = await Experience.create({
            ...value,
            user: req.user.id
        });

        return res.success({
            message: "Experience created successfully",
            data: newExp
        });

    } catch (error) {
        console.error("Create Experience Error:", error);
        return res.internalServerError({
            message: "Failed to create experience",
            data: { errors: error.message }
        });
    }
};
