import express from 'express'
import { getUser, login } from '../controllers/authController.js';
import { isAuthenticated } from '../middlewares/auth.js';

const router = express.Router()

router.post('/login', login);
router.get('/user', isAuthenticated, getUser);

export default router;
