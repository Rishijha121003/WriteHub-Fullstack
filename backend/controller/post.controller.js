import { Post } from "../models/post.model.js";
import mongoose from "mongoose";
import { uploadOnCloudinary } from "../config/cloudinary.js";

export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        if (!title || !content) {
            return res.status(400).json({ success: false, message: "Title and content are required." });
        }

        let coverImageUrl = '';
        if (req.file) {
            const coverImageLocalPath = req.file.path;
            const cloudinaryResponse = await uploadOnCloudinary(coverImageLocalPath);

            if (cloudinaryResponse && cloudinaryResponse.secure_url) {
                coverImageUrl = cloudinaryResponse.secure_url;
            } else {
                console.log("Cloudinary upload failed or returned no URL");
            }
        }

        const newPost = new Post({
            title,
            content,
            coverImage: coverImageUrl,
            author: req.user._id,
        });

        await newPost.save();
        res.status(201).json({ success: true, message: "Post created successfully!", post: newPost });

    } catch (error) {
        console.error("Error in createPost controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        // Saare posts ka total count nikaalo
        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const posts = await Post.find({})
            .populate('author', 'firstName lastName')
            .sort({ createdAt: -1 })
            .skip(skip) // Itne posts ko chhod do
            .limit(limit); // Sirf itne posts bhejo

        res.status(200).json({
            success: true,
            posts,
            pagination: {
                currentPage: page,
                totalPages: totalPages,
                totalPosts: totalPosts
            }
        });

    } catch (error) {
        console.error("Error in getAllPosts controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

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

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid post ID" });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "Forbidden: You are not authorized to edit this post" });
        }

        let newCoverImageUrl = post.coverImage;
        if (req.file) {
            const cloudinaryResponse = await uploadOnCloudinary(req.file.path);
            // YAHAN PAR BHI FIX KIYA GAYA HAI: .url ki jagah .secure_url
            if (cloudinaryResponse && cloudinaryResponse.secure_url) {
                newCoverImageUrl = cloudinaryResponse.secure_url;
            }
        }

        post.title = title || post.title;
        post.content = content || post.content;
        post.coverImage = newCoverImageUrl;

        const updatedPost = await post.save();

        res.status(200).json({ success: true, message: "Post updated successfully", post: updatedPost });

    } catch (error) {
        console.error("Error in updatePost controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getRecentPosts = async (req, res) => {
    try {
        const recentPosts = await Post.find({})
            .populate('author', 'firstName lastName')
            .sort({ createdAt: -1 })
            .limit(3);

        res.status(200).json({ success: true, posts: recentPosts });

    } catch (error) {
        console.error("Error in getRecentPosts controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "Invalid post ID" });
        }

        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ success: false, message: "Post not found" });
        }

        // Authorization Check: Kya logged-in user hi is post ka author hai?
        if (post.author.toString() !== userId.toString()) {
            return res.status(403).json({ success: false, message: "Forbidden: You are not authorized to delete this post" });
        }

        await Post.findByIdAndDelete(id);

        res.status(200).json({ success: true, message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error in deletePost controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const searchPosts = async (req, res) => {
    // YEH DO LINES ADD KARO
    console.log("--- SEARCH REQUEST RECEIVED ---");
    console.log("Full query object from request:", req.query);

    try {
        const query = req.query.q;
        if (!query) {
            console.log("Error: Search query 'q' is missing!");
            return res.status(400).json({ success: false, message: "Search query is required." });
        }

        const posts = await Post.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { content: { $regex: query, $options: 'i' } }
            ]
        }).populate('author', 'firstName lastName');

        res.status(200).json({ success: true, posts });

    } catch (error) {
        console.error("Error in searchPosts controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
export const getTopAuthors = async (req, res) => {
    try {
        const topAuthors = await Post.aggregate([
            // Step 1: Har author ke posts ko group karo aur count karo
            {
                $group: {
                    _id: "$author",
                    postCount: { $sum: 1 }
                }
            },
            // Step 2: Post count ke hisaab se sort karo (descending)
            {
                $sort: { postCount: -1 }
            },
            // Step 3: Sirf top 4 authors lo
            {
                $limit: 4
            },
            // Step 4: 'users' collection se author ki details (jaise naam) fetch karo
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "_id",
                    as: "authorDetails"
                }
            },
            // Step 5: Sirf zaroori data aage bhejo
            {
                $project: {
                    _id: 0,
                    postCount: 1,
                    author: { $arrayElemAt: ["$authorDetails", 0] }
                }
            }
        ]);

        res.status(200).json({ success: true, authors: topAuthors });

    } catch (error) {
        console.error("Error in getTopAuthors controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
// backend/controller/post.controller.js

export const getMyPosts = async (req, res) => {
    try {
        // req.user._id protectRoute middleware se aa raha hai
        const posts = await Post.find({ author: req.user._id })
            .sort({ createdAt: -1 });
            
        res.status(200).json({ success: true, posts });

    } catch (error) {
        console.error("Error in getMyPosts controller: ", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};