import Work from "../../models/work.js";
import { createWorkSchema } from "../../validation/workValidation.js";

export default async (req, res) => {
    try {
        const { error, value } = createWorkSchema.validate(req.body);
        if (error)
            return res.validationError({ message: error.details[0].message });

        // Uploaded images
        const imagePaths = req.files?.map((file) => `/uploads/works/${file.filename}`) || [];

        const newWork = await Work.create({
            ...value,
            user: req.user.id,
            workImages: imagePaths,
        });

        return res.success({
            message: "Work created successfully",
            data: newWork,
        });

    } catch (error) {
        console.error("Create Work Error:", error);
        return res.internalServerError({
            message: "Failed to create work",
            data: { errors: error.message },
        });
    }
};
