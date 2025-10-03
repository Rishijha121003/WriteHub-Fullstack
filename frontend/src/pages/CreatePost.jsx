import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const CreatePost = () => {
    // 1. FormData text ke liye alag, aur file ke liye alag state
    const [textData, setTextData] = useState({ title: '', content: '' });
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleTextChange = (e) => {
        setTextData({ ...textData, [e.target.id]: e.target.value });
    };

    // 2. File input ke liye naya handler
    const handleFileChange = (e) => {
        setCoverImageFile(e.target.files[0]);
    };

    // 3. handleSubmit ko FormData use karne ke liye update kiya gaya
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', textData.title);
        formData.append('content', textData.content);
        if (coverImageFile) {
            formData.append('coverImage', coverImageFile);
        }

        try {
            setLoading(true);
            setError(null);
            const res = await fetch('/api/v1/posts/create', {
                method: 'POST',
                body: formData, // JSON ki jagah FormData bhejo
                credentials: 'include',
                // Content-Type header yahan nahi dena hai, browser khud dega
            });
            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }
            setLoading(false);
            navigate('/blogs');
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Card className="w-full p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                <CardHeader>
                    <CardTitle>
                        <h1 className="text-center text-3xl font-bold">Create a New Post</h1>
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="title" className="text-lg">Title</Label>
                            <Input
                                id="title"
                                type="text"
                                placeholder="Your Post Title"
                                className="dark:border-gray-600 dark:bg-gray-700 mt-2"
                                onChange={handleTextChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="content" className="text-lg">Content</Label>
                            <Textarea
                                id="content"
                                placeholder="Write your story here..."
                                className="dark:border-gray-600 dark:bg-gray-700 mt-2 min-h-[300px]"
                                onChange={handleTextChange}
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="coverImageFile" className="text-lg">Cover Image</Label>
                            <Input
                                id="coverImageFile"
                                type="file" // <-- URL WALA HATAKAR YEH ADD KIYA HAI
                                className="dark:border-gray-600 dark:bg-gray-700 mt-2 file:text-white"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                            {loading ? 'Publishing...' : 'Publish Post'}
                        </Button>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreatePost;