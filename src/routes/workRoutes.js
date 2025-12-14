import express from 'express'
import getUploader from '../middlewares/upload.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { createWork, deleteWork, getAllWork, getWorkById, updateWork } from '../controllers/workController.js';

const router = express.Router()

const upload = getUploader('works');

router.get('/get-all', getAllWork);
router.post('/create',isAuthenticated, upload.array("workImages", 5), createWork);
router.put('/update/:id', isAuthenticated, upload.array("workImages", 5), updateWork);
router.get('/get/:id', isAuthenticated, getWorkById);
router.delete('/delete/:id', isAuthenticated, deleteWork);

export default router;
