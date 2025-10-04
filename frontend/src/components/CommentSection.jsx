import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from 'react-router-dom';

// Chhota component ek single comment ko display karne ke liye
const Comment = ({ comment }) => (
    <div className="flex items-start space-x-4">
        <Avatar>
            <AvatarImage src={comment.author.photoUrl || `https://avatar.vercel.sh/${comment.author.email}.png`} />
            <AvatarFallback>{comment.author.firstName?.charAt(0)}{comment.author.lastName?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
            <div className="flex items-center space-x-2">
                <p className="font-semibold text-sm">{comment.author.firstName} {comment.author.lastName}</p>
                <p className="text-xs text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</p>
            </div>
            <p className="text-gray-700 dark:text-gray-300">{comment.content}</p>
        </div>
    </div>
);


const CommentSection = ({ postId }) => {
    const { authUser } = useAuthContext();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`/api/v1/comments/${postId}`);
                const data = await res.json();
                if (data.success) {
                    setComments(data.comments);
                }
            } catch (error) {
                console.error("Failed to fetch comments", error);
            }
        };
        fetchComments();
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/v1/comments/${postId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: newComment }),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                setComments([data.comment, ...comments]); // Naye comment ko list mein sabse upar add karo
                setNewComment(""); // Textarea ko khaali karo
            }
        } catch (error) {
            console.error("Failed to post comment", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-12 pt-8 border-t dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-6">Comments ({comments.length})</h2>

            {/* Comment Form */}
            {authUser ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <Textarea
                        placeholder="Write a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="mb-2"
                        required
                    />
                    <Button type="submit" disabled={loading}>
                        {loading ? 'Posting...' : 'Post Comment'}
                    </Button>
                </form>
            ) : (
                <p className="mb-8 text-gray-500">
                    <Link to="/login" className="text-purple-600 hover:underline">Log in</Link> to post a comment.
                </p>
            )}

            {/* Comments List */}
            <div className="space-y-6">
                {comments.length > 0 ? (
                    comments.map(comment => <Comment key={comment._id} comment={comment} />)
                ) : (
                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
};

export default CommentSection;