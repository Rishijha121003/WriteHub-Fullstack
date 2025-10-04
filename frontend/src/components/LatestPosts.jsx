import React, { useState, useEffect } from 'react';
import BlogPostCard from './BlogPostCard';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';

const LatestPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentPosts = async () => {
            try {
                const res = await fetch('/api/v1/posts/recent');
                const data = await res.json();
                if (data.success) {
                    setPosts(data.posts);
                }
            } catch (error) {
                console.error("Failed to fetch recent posts:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchRecentPosts();
    }, []);

    if (loading) {
        return <div className="text-center py-10">Loading...</div>;
    }

    return (
        <section className="py-16 bg-gray-50 dark:bg-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">Latest From The Hub</h2>
                {posts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <BlogPostCard key={post._id} post={post} />
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No recent posts found.</p>
                )}
                <div className="text-center mt-12">
                    <Link to="/blogs">
                        <Button className="text-lg">View All Posts</Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default LatestPosts;