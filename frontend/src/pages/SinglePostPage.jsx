// frontend/src/pages/SinglePostPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; // useNavigate ko import karo
import { useAuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';

const SinglePostPage = () => {
    const { id } = useParams();
    const { authUser } = useAuthContext();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // ... fetchPost function waisa hi rahega ...
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/v1/posts/${id}`);
                const data = await res.json();
                if (data.success) { setPost(data.post); }
                else { throw new Error(data.message); }
            } catch (err) { setError(err.message); }
            finally { setLoading(false); }
        };
        fetchPost();
    }, [id]);

    const handleDelete = async () => {
        // Delete karne se pehle confirmation poocho
        if (!window.confirm("Are you sure you want to delete this post?")) {
            return;
        }
        try {
            const res = await fetch(`/api/v1/posts/${id}`, {
                method: 'DELETE',
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }
            // Success par blogs page par bhej do
            navigate('/blogs');
        } catch (err) {
            console.error("Failed to delete post:", err.message);
            setError(err.message);
        }
    };

    // ... loading, error, post not found checks ...
    if (loading) return <div className="text-center py-20">Loading post...</div>;
    if (error) return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    if (!post) return <div className="text-center py-20">Post not found.</div>;


    const isAuthor = authUser && post && authUser._id === post.author._id;

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">{post.title}</h1>

            {/* Author, Date, and Action Buttons */}
            <div className="flex justify-between items-center text-gray-500 dark:text-gray-400 mb-8">
                <div>
                    <span>By {post.author.firstName} {post.author.lastName}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                {isAuthor && (
                    <div className="flex gap-2">
                        <Link to={`/edit-post/${post._id}`}>
                            <Button variant="outline">Edit Post</Button>
                        </Link>
                        {/* Naya Delete Button */}
                        <Button variant="destructive" onClick={handleDelete}>Delete Post</Button>
                    </div>
                )}
            </div>

            {/* ... baaki ka component waisa hi rahega ... */}
            <img src={post.coverImage || 'https://placehold.co/1200x600/EEE/31343C?text=WriteHub'} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-8" />
            <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
                {post.content.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default SinglePostPage;