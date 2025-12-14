import Experience from "../../models/experience.js";
import { updateExperienceSchema } from "../../validation/experienceValidation.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        const { error, value } = await updateExperienceSchema.validate(req.body);
        if (error) {
            return res.validationError({ message: error.details[0].message });
        }

        const updatedExp = await Experience.findOneAndUpdate(
            { _id: id, user: req.user.id },
            value,
            { new: true }
        );

        if (!updatedExp) {
            return res.recordNotFound({ message: "Experience not found" });
        }

        return res.success({
            message: "Experience updated successfully",
            data: updatedExp
        });

    } catch (error) {
        console.error("Update Experience Error:", error);
        return res.internalServerError({
            message: "Failed to update experience",
            data: { errors: error.message }
        });
    }
};
