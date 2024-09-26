import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap';
import JoditEditor from 'jodit-react';
import { useTheme } from '../context/ThemeContext';
import { loadAllCategories, createPost } from '../services/Category-Service';
import { getCurrentUserDetail, isLoggedIn } from '../auth/index';

const AddPost = () => {
    const editor = useRef(null);
    const { theme } = useTheme();
    const [content, setContent] = useState('');
    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({ title: '', categoryId: -1 });
    const [user, setUser] = useState(undefined);
    const [error, setError] = useState('');
    // const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const config = useMemo(() => ({
        placeholder: "Start typing...",
        height: 400,
        width: '100%',
        minHeight: 300,
        maxHeight: 800,
        toolbarSticky: false,
        statusbar: false,
    }), []);

   useEffect(() => {
    const fetchData = async () => {
        setUser(getCurrentUserDetail());
        await loadAllCategories(setCategories, setError);
        // setLoading(false);
    };
    fetchData();
}, []);


    const handleFieldChange = (event) => {
        const { name, value } = event.target;
        setPost(prevPost => ({
            ...prevPost,
            [name]: value
        }));
    };

    const handlePost = async (event) => {
        event.preventDefault();

        if (!isLoggedIn()) {
            alert("You must be logged in to create a post.");
            return;
        }

        if (!user) {
            alert("User information is not available.");
            return;
        }

        if (post.title.trim() === '') {
            setError("Write title!");
            return;
        }
        if (post.categoryId === -1) {
            setError("Select category!");
            return;
        }
        if (content.trim() === '') {
            setError("Write some content!");
            return;
        }

        const postDto = {
            title: post.title,
            categoryId: parseInt(post.categoryId, 10),
            content,
            userId: user.id,
        };

        setSubmitting(true);
        try {
            await createPost(postDto);
            alert("Post created successfully");
            handleReset();
        } catch (error) {
            console.error('Failed to create post:', error);
            setError("Error creating post: " + (error.response?.data?.message || "Unknown error"));
        } finally {
            setSubmitting(false);
        }
    };

    const handleReset = () => {
        setPost({ title: '', categoryId: -1 });
        setContent('');
        setError('');
    };

    // if (loading) return <div>Loading...</div>;

    return (
        <div className={`add-post-container ${theme}-theme`}>
            <Card className={`shadow mt-3 ${theme}-card`}>
                <CardBody>
                    <h2>Let your mind speak!</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <Form onSubmit={handlePost}>
                        <div className="mt-3">
                            <Label for="title">Post title:</Label>
                            <Input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Enter title"
                                value={post.title}
                                onChange={handleFieldChange}
                            />
                        </div>
                        <div className="mt-3">
                            <Label for="category">Post category:</Label>
                            <Input
                                type="select"
                                id="category"
                                name="categoryId"
                                value={post.categoryId}
                                onChange={handleFieldChange}
                            >
                                <option value="-1">Select option</option>
                                {categories.map((category) => (
                                    <option key={category.categoryId} value={category.categoryId}>
                                        {category.categoryTitle}
                                    </option>
                                ))}
                            </Input>
                        </div>
                        <div className="mt-3">
                            <Label for="content">Post content:</Label>
                            <JoditEditor
                                ref={editor}
                                value={content}
                                onChange={newContent => setContent(newContent)}
                                config={config}
                                tabIndex={1}
                            />
                        </div>
                        <Container className="text-center mt-3">
                            <Button type="submit" color="primary" disabled={submitting}>Post</Button>
                            <Button type="button" color="danger" className="ms-2" onClick={handleReset}>Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    );
};

export default AddPost;
