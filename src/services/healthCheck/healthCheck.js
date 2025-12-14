export default async (req, res) => {
    try {
        res.success({
            message: 'healthy',
        });
    } catch (error) {
        res.internalServerError({
            error: error.message,
        });
    }
};

