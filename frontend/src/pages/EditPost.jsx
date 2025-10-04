import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

// Toolbar component (aap ise ek alag file mein bhi rakh sakte hain)
const Toolbar = ({ editor }) => {
    if (!editor) return null;
    return (
        <div className="border border-gray-300 rounded-t-lg p-2 flex gap-2 dark:border-gray-600">
            <Button type="button" onClick={() => editor.chain().focus().toggleBold().run()} variant={editor.isActive('bold') ? 'default' : 'outline'}>Bold</Button>
            <Button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} variant={editor.isActive('italic') ? 'default' : 'outline'}>Italic</Button>
            <Button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} variant={editor.isActive('heading', { level: 2 }) ? 'default' : 'outline'}>H2</Button>
            <Button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} variant={editor.isActive('bulletList') ? 'default' : 'outline'}>List</Button>
        </div>
    );
};

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [coverImageFile, setCoverImageFile] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const editor = useEditor({
        extensions: [StarterKit],
        content: '', // Shuru mein khaali rakho, data fetch karke daalenge
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert min-h-[300px] w-full rounded-b-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-4 focus:outline-none',
            },
        },
    });

    // Post ka purana data fetch karke editor mein daalo
    useEffect(() => {
        if (!id || !editor) return;

        const fetchPostData = async () => {
            try {
                const res = await fetch(`/api/v1/posts/${id}`);
                const data = await res.json();
                if (data.success) {
                    setTitle(data.post.title);
                    editor.commands.setContent(data.post.content); // Editor mein content set karo
                } else {
                    throw new Error(data.message);
                }
            } catch (err) {
                setError(err.message);
            }
        };
        fetchPostData();
    }, [id, editor]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        const content = editor.getHTML();

        const dataToSend = new FormData();
        dataToSend.append('title', title);
        dataToSend.append('content', content);
        if (coverImageFile) {
            dataToSend.append('coverImage', coverImageFile);
        }

        try {
            setLoading(true);
            setError(null);
            const res = await fetch(`/api/v1/posts/${id}`, {
                method: 'PUT',
                body: dataToSend,
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }
            setLoading(false);
            navigate(`/blog/${id}`);
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <Card className="w-full p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                <CardHeader><CardTitle><h1 className="text-center text-3xl font-bold">Edit Your Post</h1></CardTitle></CardHeader>
                <CardContent>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <Label htmlFor="title" className="text-lg">Title</Label>
                            <Input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                        </div>
                        <div>
                            <Label className="text-lg">Content</Label>
                            <Toolbar editor={editor} />
                            <EditorContent editor={editor} />
                        </div>
                        <div>
                            <Label htmlFor="coverImageFile" className="text-lg">Change Cover Image (Optional)</Label>
                            <Input id="coverImageFile" type="file" onChange={(e) => setCoverImageFile(e.target.files[0])} />
                        </div>
                        <Button type="submit" className="w-full text-lg py-6" disabled={loading || !editor}>
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