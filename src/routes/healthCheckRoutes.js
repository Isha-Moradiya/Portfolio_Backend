import express from'express'
const router = express.Router()

import { healthCheck } from '../controllers/healthCheckController.js';

router.get('/health-check', healthCheck);

export default router;
