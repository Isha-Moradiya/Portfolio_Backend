import healthCheckService from '../services/healthCheck/healthCheck.js';

const healthCheck = async (req, res) => {
    try {
        await healthCheckService(req, res);
    } catch (error) {
        return res.failure({ message: error.message });
    }
};

export {
    healthCheck,
};
