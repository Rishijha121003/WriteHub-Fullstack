import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from '@/components/ui/card';

const TopAuthors = () => {
    const [authors, setAuthors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTopAuthors = async () => {
            try {
                const res = await fetch('/api/v1/posts/top-authors');
                const data = await res.json();
                if (data.success) {
                    setAuthors(data.authors);
                }
            } catch (error) {
                console.error("Failed to fetch top authors:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchTopAuthors();
    }, []);

    if (loading) return null; // Ya loading spinner dikha sakte hain

    return (
        <section className="py-20 bg-white dark:bg-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-10 dark:text-white">Our Top Contributors</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {authors.map(({ author, postCount }) => (
                        <Card key={author._id} className="p-6 flex flex-col items-center text-center transition-transform transform hover:-translate-y-2">
                            <Avatar className="w-24 h-24 mb-4 border-4 border-purple-500">
                                <AvatarImage src={author.photoUrl || `https://avatar.vercel.sh/${author.email}.png`} />
                                <AvatarFallback>{author.firstName.charAt(0)}{author.lastName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-bold">{author.firstName} {author.lastName}</h3>
                            <p className="text-purple-500 font-semibold">{postCount} Posts</p>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TopAuthors;