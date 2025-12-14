import Work from "../../models/work.js";

export default async (req, res) => {
    try {
        const {
            search,
            category,
            featured,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "desc",
        } = req.query;

        const filter = { user: req.user.id };

        if (category) filter.category = category;
        if (featured) filter.featured = featured === "true";

        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [{ title: regex }, { description: regex }];
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        const sortDirection = sortOrder === "asc" ? 1 : -1;

        const [works, total] = await Promise.all([
            Work.find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(limitNumber)
                .lean(),
            Work.countDocuments(filter),
        ]);

        return res.success({
            message: "Works fetched successfully",
            data: works,
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
                pages: Math.ceil(total / limitNumber),
            },
        });

    } catch (error) {
        console.error("Get All Works Error:", error);
        return res.internalServerError({
            message: "Failed to fetch works",
            data: { errors: error.message },
        });
    }
};
