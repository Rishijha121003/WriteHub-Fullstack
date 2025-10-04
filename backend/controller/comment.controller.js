import { Comment } from '../models/comment.model.js';
import { Post } from '../models/post.model.js';

export const createComment = async (req, res) => {
    try {
        const { content } = req.body;
        const postId = req.params.postId;
        const authorId = req.user._id;

        if (!content) {
            return res.status(400).json({ success: false, message: "Comment content is required." });
        }

        const newComment = new Comment({
            content,
            author: authorId,
            post: postId,
        });
        await newComment.save();

        // Post mein comment ki ID add karo
        await Post.findByIdAndUpdate(postId, {
            $push: { comments: newComment._id }
        });

        // Poori author details ke saath comment wapas bhejo
        const populatedComment = await Comment.findById(newComment._id).populate('author', 'firstName lastName photoUrl');

        res.status(201).json({ success: true, comment: populatedComment });

    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getCommentsForPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const comments = await Comment.find({ post: postId })
            .populate('author', 'firstName lastName photoUrl email') // email for avatar fallback
            .sort({ createdAt: -1 });

        res.status(200).json({ success: true, comments });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};