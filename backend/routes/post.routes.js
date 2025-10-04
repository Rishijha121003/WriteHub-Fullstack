import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost,
    getRecentPosts,
    searchPosts,
    getTopAuthors,
    getMyPosts // getMyPosts ko import karo
} from "../controller/post.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// --- Specific Routes Pehle ---
router.get("/", getAllPosts);
router.get("/recent", getRecentPosts);
router.get("/search", searchPosts);
router.get("/top-authors", getTopAuthors);
router.get("/my-posts", protectRoute, getMyPosts); // Specific protected route

// --- Protected Routes (Actions) ---
router.post("/create", protectRoute, upload.single("coverImage"), createPost);

// --- Dynamic Routes (Hamesha Aakhir Mein) ---
router.get("/:id", getPostById);
router.put("/:id", protectRoute, upload.single("coverImage"), updatePost);
router.delete("/:id", protectRoute, deletePost);

export default router;