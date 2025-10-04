import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Yeh 'User' model se link karega
        required: true,
    },
    coverImage: {
        type: String, // URL of the image
        default: 'https://via.placeholder.com/800x400.png?text=WriteHub',
    },
     author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // <-- Yeh 'User' bilkul sahi (case-sensitive) hona chahiye
        required: true,
    },
}, { timestamps: true });

export const Post = mongoose.model("Post", postSchema);