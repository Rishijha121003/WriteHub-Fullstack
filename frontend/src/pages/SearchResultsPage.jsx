import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import BlogPostCard from '../components/BlogPostCard';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!query) return;

        const fetchSearchResults = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/v1/posts/search?q=${query}`);
                const data = await res.json();
                if (data.success) {
                    setPosts(data.posts);
                }
            } catch (error) {
                console.error("Search failed:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchSearchResults();
    }, [query]);

    if (loading) return <div className="text-center py-10">Searching...</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 dark:text-white">
                Search Results for: <span className="text-purple-600">"{query}"</span>
            </h1>
            {posts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <BlogPostCard key={post._id} post={post} />
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 text-lg">No posts found matching your search.</p>
            )}
        </div>
    );
};

export default SearchResultsPage;