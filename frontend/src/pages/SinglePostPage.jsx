import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SinglePostPage = () => {
    const { id } = useParams(); // URL se post ID nikalne ke liye
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/v1/posts/${id}`);
                const data = await res.json();
                if (data.success) {
                    setPost(data.post);
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id]); // Yeh useEffect tab chalega jab URL ka 'id' badlega

    if (loading) {
        return <div className="text-center py-20">Loading post...</div>;
    }

    if (error) {
        return <div className="text-center py-20 text-red-500">Error: {error}</div>;
    }

    if (!post) {
        return <div className="text-center py-20">Post not found.</div>;
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            {/* Cover Image */}
            <img src={post.coverImage || 'https://via.placeholder.com/1200x600.png?text=WriteHub'} alt={post.title} className="w-full h-96 object-cover rounded-lg mb-8" />
            
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 dark:text-white">{post.title}</h1>
            
            {/* Author and Date */}
            <div className="flex items-center text-gray-500 dark:text-gray-400 mb-8">
                <span>By {post.author.firstName} {post.author.lastName}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>

            {/* Content */}
            <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
                {/* Agar content mein HTML hai, toh dangerouslySetInnerHTML ka use karna padega, abhi ke liye simple text theek hai */}
                {post.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </div>
        </div>
    );
};

export default SinglePostPage;