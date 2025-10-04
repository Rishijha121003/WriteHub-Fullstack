import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const EditPost = () => {
    const { id } = useParams(); // URL se post ki ID nikalo
    const [formData, setFormData] = useState({ title: '', content: '' });
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 1. Post ka purana data fetch karo
    useEffect(() => {
        const fetchPostData = async () => {
            try {
                const res = await fetch(`/api/v1/posts/${id}`);
                const data = await res.json();
                if (data.success) {
                    setFormData({
                        title: data.post.title,
                        content: data.post.content,
                    });
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchPostData();
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleFileChange = (e) => {
        setCoverImageFile(e.target.files[0]);
    };

    // 2. Form submit hone par 'PUT' request bhejo
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const dataToSend = new FormData();
        dataToSend.append('title', formData.title);
        dataToSend.append('content', formData.content);
        if (coverImageFile) {
            dataToSend.append('coverImage', coverImageFile);
        }

        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`/api/v1/posts/${id}`, { // URL mein ID use karo
                method: 'PUT', // Method ko 'PUT' rakho
                body: dataToSend,
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }
            setLoading(false);
            navigate(`/blog/${id}`); // Update ke baad wapas post page par bhej do
        } catch (err) {
            setLoading(false);
setError(err.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Card className="w-full p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                <CardHeader>
                    <CardTitle><h1 className="text-center text-3xl font-bold">Edit Your Post</h1></CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="title" className="text-lg">Title</Label>
                            <Input
                                id="title" type="text"
                                className="dark:border-gray-600 dark:bg-gray-700 mt-2"
                                onChange={handleChange}
                                value={formData.title} // 3. Value ko state se jodo
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="content" className="text-lg">Content</Label>
                            <Textarea
                                id="content"
                                className="dark:border-gray-600 dark:bg-gray-700 mt-2 min-h-[300px]"
                                onChange={handleChange}
                                value={formData.content} // 3. Value ko state se jodo
                                required
                            />
                        </div>
                        <div>
                            <Label htmlFor="coverImageFile" className="text-lg">Change Cover Image (Optional)</Label>
                            <Input
                                id="coverImageFile" type="file"
                                className="dark:border-gray-600 dark:bg-gray-700 mt-2 file:text-white"
                                onChange={handleFileChange}
                            />
                        </div>
                        <Button type="submit" className="w-full text-lg py-6" disabled={loading}>
                            {loading ? 'Updating...' : 'Update Post'}
                        </Button>
                        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default EditPost;