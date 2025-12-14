import Contact from "../../models/contact.js";

export default async (req, res) => {
    try {
        const {
            search,
            status,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "asc"
        } = req.query;

        const filter = {};

        if (status) filter.status = status;

        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [
                { name: regex },
                { email: regex },
                { subject: regex },
                { message: regex }
            ];
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const sortDirection = sortOrder === "asc" ? 1 : -1;

        // Parallel execution
        const [messages, total] = await Promise.all([
            Contact.find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(limitNumber)
                .lean(),
            Contact.countDocuments(filter)
        ]);

        return res.success({
            message: "Messages fetched successfully",
            data: messages,
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
                pages: Math.ceil(total / limitNumber),
            },
        });

    } catch (error) {
        console.error("Get All Messages Error:", error);
        return res.internalServerError({
            message: "Failed to fetch messages",
            data: { errors: error.message },
        });
    }
};
