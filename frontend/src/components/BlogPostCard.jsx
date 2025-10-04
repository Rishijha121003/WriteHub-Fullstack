import React from 'react';
import { Link } from 'react-router-dom';

const BlogPostCard = ({ post }) => {
    // 1. Content se saare HTML tags hatakar plain text banao
    const plainTextContent = post.content.replace(/<[^>]*>?/gm, ' ');

    // 2. Ab us plain text ka snippet banao
    const snippet = plainTextContent.substring(0, 100) + '...';

    return (
        <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-slate-800 dark:border-gray-700">
            <Link to={`/blog/${post._id}`}>
                <img 
                    src={post.coverImage || 'https://placehold.co/800x400/EEE/31343C?text=WriteHub'} 
                    alt={post.title} 
                    className="w-full h-48 object-cover" 
                />
            </Link>
            <div className="p-4">
                <h2 className="text-xl font-bold mb-2 dark:text-white">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    By {post.author.firstName} {post.author.lastName}
                </p>
                {/* 3. Yahan par saaf text snippet dikhao */}
                <p className="text-gray-700 dark:text-gray-300">{snippet}</p>
                <Link to={`/blog/${post._id}`} className="text-purple-600 hover:underline mt-4 inline-block">
                    Read More &rarr;
                </Link>
            </div>
        </div>
    );
};

export default BlogPostCard;