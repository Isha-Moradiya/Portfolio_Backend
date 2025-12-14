import Experience from "../../models/experience.js";

export default async (req, res) => {
    try {
        const {
            search,
            current,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        const filter = { user: req.user.id };

        if (typeof current !== "undefined") {
            filter.current = current === "true";
        }

        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [{ role: regex }, { company: regex }];
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const sortDirection = sortOrder === "asc" ? 1 : -1;

        const [experiences, total] = await Promise.all([
            Experience.find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(limitNumber)
                .lean(),
            Experience.countDocuments(filter),
        ]);

        return res.success({
            message: "Experiences fetched successfully",
            data: experiences,
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
                pages: Math.ceil(total / limitNumber),
            },
        });

    } catch (error) {
        console.error("Get All Experiences Error:", error);
        return res.internalServerError({
            message: "Failed to fetch experiences",
            data: { errors: error.message },
        });
    }
};
