import express from 'express'
import { isAuthenticated } from '../middlewares/auth.js';
import { createContact, getAllContact, getContactById, updateContact } from '../controllers/contactController.js';

const router = express.Router()

router.post('/create', createContact);
router.get('/get-all', isAuthenticated, getAllContact);
router.put('/update/:id', isAuthenticated, updateContact);
router.get('/get/:id', isAuthenticated, getContactById);

export default router;
