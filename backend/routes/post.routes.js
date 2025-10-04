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
    getTopAuthors
} from "../controller/post.controller.js";
import { upload } from "../middleware/multer.js";

const router = express.Router();

// GENERAL ROUTES
router.get("/", getAllPosts);
router.get("/recent", getRecentPosts);
router.get("/search", searchPosts);
router.get("/top-authors", getTopAuthors); // <-- YEH MISSING ROUTE ADD KARO


// DYNAMIC ROUTE (sabse aakhir mein)
router.get("/:id", getPostById);

// PROTECTED ROUTES
router.post("/create", protectRoute, upload.single("coverImage"), createPost);
router.put("/:id", protectRoute, upload.single("coverImage"), updatePost);
router.delete("/:id", protectRoute, deletePost);

export default router;