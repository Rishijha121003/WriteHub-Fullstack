import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { adminOnly } from '../middleware/adminOnly.js';
import { getAllUsers, deleteUser, getStats } from '../controller/admin.controller.js';

const router = express.Router();

router.get('/stats', protectRoute, adminOnly, getStats);
router.get('/users', protectRoute, adminOnly, getAllUsers);
router.delete('/users/:id', protectRoute, adminOnly, deleteUser);

export default router;