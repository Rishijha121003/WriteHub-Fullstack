import React, { useState, useEffect } from 'react';
import BlogPostCard from '../components/BlogPostCard';
import { Button } from '@/components/ui/button';

const Blogs = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                // API call mein page number bhejo
                const res = await fetch(`/api/v1/posts?page=${currentPage}&limit=5`);
                const data = await res.json();
                if (data.success) {
                    setPosts(data.posts);
                    setTotalPages(data.pagination.totalPages);
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
    }, [currentPage]); // useEffect ab currentPage badalne par dobara chalega

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };


    if (loading) {
        return <div className="text-center py-20">Loading posts...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center mb-12 dark:text-white">All Blogs</h1>
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <BlogPostCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500">No posts found.</p>
            )}

            {/* Pagination Buttons */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-4 mt-12">
                    <Button onClick={handlePrevPage} disabled={currentPage === 1}>
                        &larr; Previous
                    </Button>
                    <span className="font-semibold">
                        Page {currentPage} of {totalPages}
                    </span>
                    <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
                        Next &rarr;
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Blogs;