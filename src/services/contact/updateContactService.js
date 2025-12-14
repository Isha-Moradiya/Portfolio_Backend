import Contact from "../../models/contact.js";
import { updateContactStatusSchema } from "../../validation/contactValidation.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        const { error, value } = updateContactStatusSchema.validate(req.body);
        if (error) {
            return res.validationError({
                message: error.details[0].message,
            });
        }

        const updatedMessage = await Contact.findByIdAndUpdate(id, value, { new: true });

        if (!updatedMessage) {
            return res.recordNotFound({ message: "Message not found" });
        }

        return res.success({
            message: "Message updated successfully",
            data: updatedMessage,
        });

    } catch (error) {
        console.error("Update Message Error:", error);
        return res.internalServerError({
            message: "Failed to update message",
            data: { errors: error.message },
        });
    }
};
