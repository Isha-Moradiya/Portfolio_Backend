import Work from "../../models/work.js";
import { updateWorkSchema } from "../../validation/workValidation.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        // Validate body
        const { error, value } = updateWorkSchema.validate(req.body);
        if (error)
            return res.validationError({ message: error.details[0].message });

        // New uploaded images (multiple)
        const newImages = req.files?.map((file) => `/uploads/works/${file.filename}`) || [];

        // Fetch existing work
        const existingWork = await Work.findOne({ _id: id, user: req.user.id });
        if (!existingWork)
            return res.recordNotFound({ message: "Work not found" });

        // Merge Images
        const updatedImages =
            newImages.length > 0
                ? [...existingWork.workImages, ...newImages] // Add new ones
                : value.workImages || existingWork.workImages;

        const updateData = {
            ...value,
            workImages: updatedImages,
        };

        const updatedWork = await Work.findOneAndUpdate(
            { _id: id, user: req.user.id },
            updateData,
            { new: true }
        );

        return res.success({
            message: "Work updated successfully",
            data: updatedWork,
        });

    } catch (error) {
        console.error("Update Work Error:", error);
        return res.internalServerError({
            message: "Failed to update work",
            data: { errors: error.message },
        });
    }
};
