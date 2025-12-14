import Skill from "../../models/skill.js";

export default async (req, res) => {
    try {
        const {
            category,
            search,
            page = 1,
            limit = 10,
            sortBy = "createdAt",
            sortOrder = "asc",
        } = req.query;

        // Basic filter
        const filter = { };

        if (category) filter.category = category;

        if (search) {
            const regex = new RegExp(search, "i");
            filter.$or = [{ name: regex }];
        }

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;

        // Sorting
        const sortDirection = sortOrder === "asc" ? 1 : -1;

        // Fetch data
        const [skills, total] = await Promise.all([
            Skill.find(filter)
                .sort({ [sortBy]: sortDirection })
                .skip(skip)
                .limit(limitNumber)
                .lean(),
            Skill.countDocuments(filter),
        ]);

        return res.success({
            message: "Skills fetched successfully",
            data: skills,
            meta: {
                total,
                page: pageNumber,
                limit: limitNumber,
                pages: Math.ceil(total / limitNumber),
            },
        });

    } catch (error) {
        console.error("Get Skills Error:", error);
        return res.internalServerError({
            message: "Failed to retrieve skills",
            data: { errors: error.message },
        });
    }
};
