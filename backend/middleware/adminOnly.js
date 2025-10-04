export const adminOnly = (req, res, next) => {
    // Yeh req.user protectRoute se aa raha hai
    if (req.user && req.user.role === 'admin') {
        next(); // Agar user admin hai, toh aage badhne do
    } else {
        res.status(403).json({ success: false, message: "Forbidden: Admins only" });
    }
};