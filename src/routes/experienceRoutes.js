import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js';
import { createExperience, deleteExperience, getAllExperience, getExperienceById, updateExperience } from '../controllers/experienceController.js';

const router = express.Router()

router.get('/get-all', getAllExperience);
router.post('/create',isAuthenticated, createExperience);
router.put('/update/:id', isAuthenticated, updateExperience);
router.get('/get/:id', isAuthenticated, getExperienceById);
router.delete('/delete/:id', isAuthenticated, deleteExperience);

export default router;
