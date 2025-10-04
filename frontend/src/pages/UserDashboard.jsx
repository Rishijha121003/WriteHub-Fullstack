import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

const UserDashboard = () => {
    const { authUser } = useAuthContext();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyPosts = async () => {
            try {
                const res = await fetch('/api/v1/posts/my-posts', { credentials: 'include' });
                const data = await res.json();
                if (data.success) {
                    setPosts(data.posts);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                toast.error("Failed to fetch your posts.");
            } finally {
                setLoading(false);
            }
        };
        fetchMyPosts();
    }, []);

    const handleDelete = async (postId) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const res = await fetch(`/api/v1/posts/${postId}`, { method: 'DELETE', credentials: 'include' });
            const data = await res.json();
            if (data.success) {
                setPosts(posts.filter(p => p._id !== postId));
                toast.success("Post deleted!");
            } else {
                throw new Error(data.message);
            }
        } catch (err) {
            toast.error(err.message);
        }
    };

    if (loading) return <div className="text-center py-10">Loading your posts...</div>;

    return (
        <div className="max-w-7xl mx-auto py-10 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold dark:text-white">My Dashboard</h1>
                <Link to="/create-post">
                    <Button>Create New Post</Button>
                </Link>
            </div>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Created At</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {posts.length > 0 ? posts.map((post) => (
                            <TableRow key={post._id}>
                                <TableCell className="font-medium">{post.title}</TableCell>
                                <TableCell>{new Date(post.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Link to={`/blog/${post._id}`}><Button variant="outline" size="sm">View</Button></Link>
                                    <Link to={`/edit-post/${post._id}`}><Button variant="secondary" size="sm">Edit</Button></Link>
                                    <Button variant="destructive" size="sm" onClick={() => handleDelete(post._id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan="3" className="text-center">You haven't created any posts yet.</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default UserDashboard;