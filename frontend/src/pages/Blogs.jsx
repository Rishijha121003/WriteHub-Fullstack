import React, { useState, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/v1/posts/');
                const data = await res.json();
                if (data.success) {
                    setPosts(data.posts);
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading posts...</div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12 dark:text-white">Our Latest Blogs</h1>
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <BlogPostCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No posts found.</p>
            )}
        </div>
    );
};

export default Blogs;