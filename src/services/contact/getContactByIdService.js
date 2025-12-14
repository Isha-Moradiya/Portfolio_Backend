import Contact from "../../models/contact.js";

export default async (req, res) => {
    try {
        const { id } = req.params;

        const contact = await Contact.findById(id);

        if (!contact) {
            return res.recordNotFound({
                message: "Contact not found",
            });
        }

        return res.success({
            message: "Contact fetched successfully",
            data: contact,
        });

    } catch (error) {
        console.error("Get Contact By ID Error:", error);
        return res.internalServerError({
            message: "Failed to fetch contact",
            data: { errors: error.message },
        });
    }
};
