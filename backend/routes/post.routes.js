import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { createPost, getAllPosts, getPostById } from "../controller/post.controller.js";
import { upload } from "../middleware/multer.js"; // 'upload' ko import karna zaroori hai

const router = express.Router();

router.post("/create", protectRoute, upload.single("coverImage"), createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);

export default router;