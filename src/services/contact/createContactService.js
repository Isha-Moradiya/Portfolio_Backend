import Contact from "../../models/contact.js";
import { createContactSchema } from "../../validation/contactValidation.js";
import { sendContactUsEmail } from "../../resources/emailUtils.js";

export default async (req, res) => {
    try {
        // Validate
        const { error, value } = createContactSchema.validate(req.body);
        if (error) {
            return res.validationError({
                message: error.details[0].message,
            });
        }

        // Save contact
        const contact = await Contact.create(value);

        // email send
        await sendContactUsEmail({
          firstName: value.firstName,
          lastName: value.lastName,
          email: value.email,
          contactNumber: value.contactNumber,
          subject: value.subject,
          message: value.message,
        });

        return res.success({
            message: "Message submitted successfully!",
            data: contact,
        });

    } catch (error) {
        console.error("Create Contact Error:", error);
        return res.internalServerError({
            message: "Failed to submit message",
            data: { errors: error.message },
        });
    }
};
