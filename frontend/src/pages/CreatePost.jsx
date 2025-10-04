import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import toast from 'react-hot-toast';

// Toolbar component for the editor
const Toolbar = ({ editor }) => {
    if (!editor) return null;
    return (
        <div className="border border-gray-300 dark:border-gray-600 rounded-t-lg p-2 flex flex-wrap gap-2">
            <Button type="button" size="sm" onClick={() => editor.chain().focus().toggleBold().run()} variant={editor.isActive('bold') ? 'default' : 'outline'}>Bold</Button>
            <Button type="button" size="sm" onClick={() => editor.chain().focus().toggleItalic().run()} variant={editor.isActive('italic') ? 'default' : 'outline'}>Italic</Button>
            <Button type="button" size="sm" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}>H2</Button>
            <Button type="button" size="sm" onClick={() => editor.chain().focus().toggleBulletList().run()} variant={editor.isActive('bulletList') ? 'default' : 'outline'}>List</Button>
        </div>
    );
};

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const editor = useEditor({
        extensions: [StarterKit],
        content: '',
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert min-h-[300px] w-full rounded-b-md border-t-0 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 focus:outline-none',
            },
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = editor.getHTML();

        // Check if content is empty (or just an empty <p> tag)
        if (content === '<p></p>') {
            toast.error("Content cannot be empty.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (coverImageFile) {
            formData.append('coverImage', coverImageFile);
        }

        try {
            setLoading(true);
            const res = await fetch('/api/v1/posts/create', {
                method: 'POST',
                body: formData,
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }
            toast.success("Post created successfully!");
            setLoading(false);
            navigate('/blogs');
        } catch (err) {
            setLoading(false);
            toast.error(err.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Card className="w-full p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                <CardHeader>
                    <CardTitle><h1 className="text-center text-3xl font-bold">Create a New Post</h1></CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="title" className="text-lg">Title</Label>
                            <Input id="title" type="text" placeholder="Your Post Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div>
                            <Label className="text-lg">Content</Label>
                            <Toolbar editor={editor} />
                            <EditorContent editor={editor} />
                        </div>
                        <div>
                            <Label htmlFor="coverImageFile" className="text-lg">Cover Image</Label>
                            <Input id="coverImageFile" type="file" onChange={(e) => setCoverImageFile(e.target.files[0])} />
                        </div>
                        <Button type="submit" className="w-full text-lg py-6" disabled={loading || !editor}>
                            {loading ? 'Publishing...' : 'Publish Post'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default CreatePost;