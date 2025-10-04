import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createComment, getCommentsForPost } from '../controller/comment.controller.js';

const router = express.Router();

router.get('/:postId', getCommentsForPost);
router.post('/:postId', protectRoute, createComment);

export default router;