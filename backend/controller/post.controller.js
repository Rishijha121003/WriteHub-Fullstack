import { Post } from "../models/post.model.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../config/cloudinary.js";

// Sirf logged-in user hi post create kar sakta hai
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and content are required." });
        }
        
        // 1. Check karo ki koi file upload hui hai ya nahi
        let coverImageUrl = '';
        if (req.file) {
            const coverImageLocalPath = req.file.path;
            const cloudinaryResponse = await uploadOnCloudinary(coverImageLocalPath);
            
            if (cloudinaryResponse && cloudinaryResponse.url) {
                // 2. Agar upload successful hai, toh Cloudinary se URL nikalo
                coverImageUrl = cloudinaryResponse.url;
            } else {
                 console.log("Cloudinary upload failed");
                 // Optional: You can choose to return an error here if image upload fails
            }
        }

        const newPost = new Post({
            title,
            content,
            // 3. Cover image ke liye ya toh Cloudinary URL ya default value use karo
            coverImage: coverImageUrl, 
            author: req.user._id, // yeh protectRoute middleware se aa raha hai
        });

        await newPost.save();
        res.status(201).json({ success: true, message: "Post created successfully!", post: newPost });

    } catch (error) {
        console.error("Error in createPost controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Koi bhi saare posts dekh sakta hai (No changes here)
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({})
            .populate('author', 'firstName lastName')
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, posts });

    } catch (error) {
        console.error("Error in getAllPosts controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// No changes here
export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid post ID" });
        }

        const post = await Post.findById(id).populate('author', 'firstName lastName');

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        res.status(200).json({ success: true, post });

    } catch (error) {
        console.error("Error in getPostById controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};