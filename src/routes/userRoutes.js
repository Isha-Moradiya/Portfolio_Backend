import express from 'express'
import getUploader from '../middlewares/upload.js';
import { isAuthenticated } from '../middlewares/auth.js';
import { getUserDetails, updateUserDetails } from '../controllers/userController.js';

const router = express.Router()

const upload = getUploader('portfolio');
const uploadFields = [
    { name: 'heroImage', maxCount: 1 },
    { name: 'aboutImage', maxCount: 1 }
];

router.get('/get-user', getUserDetails);
router.put('/update-user', isAuthenticated, upload.fields(uploadFields), updateUserDetails);

export default router;
