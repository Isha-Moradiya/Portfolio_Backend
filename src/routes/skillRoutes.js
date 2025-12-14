import express from 'express'
import getUploader from '../middlewares/upload.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { createSkill, deleteSkill, getAllSkill, getSkillById, updateSkill } from '../controllers/skillController.js';

const router = express.Router()

const upload = getUploader('skills');

router.get('/get-all', getAllSkill);
router.post('/create',isAuthenticated, upload.single("iconImage"), createSkill);
router.put('/update/:id', isAuthenticated, upload.single("iconImage"), updateSkill);
router.get('/get/:id', isAuthenticated, getSkillById);
router.delete('/delete/:id', isAuthenticated, deleteSkill);

export default router;
