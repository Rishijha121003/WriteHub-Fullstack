import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

// Pehle se hai
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        res.status(200).json({ success: true, users });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// YEH NAYA FUNCTION ADD KARO
export const deleteUser = async (req, res) => {
    try {
        const userIdToDelete = req.params.id;
        // Admin khud ko delete na kar paaye
        if (userIdToDelete === req.user._id.toString()) {
            return res.status(400).json({ success: false, message: "Admin cannot delete their own account." });
        }
        await User.findByIdAndDelete(userIdToDelete);
        // Us user ke saare posts bhi delete kar do
        await Post.deleteMany({ author: userIdToDelete });

        res.status(200).json({ success: true, message: "User and their posts deleted successfully." });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// YEH BHI NAYA FUNCTION ADD KARO
export const getStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalPosts = await Post.countDocuments();
        res.status(200).json({
            success: true,
            stats: { totalUsers, totalPosts }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}