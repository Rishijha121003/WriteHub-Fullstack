import express from 'express';
// 'getProfile' ko yahan import karna zaroori hai
import { register, login, logout, getProfile } from '../controller/user.controller.js';
import { protectRoute } from '../middleware/protectRoute.js';

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', logout);

// Yeh route add karna zaroori hai
router.get('/profile', protectRoute, getProfile);

export default router;