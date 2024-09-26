// import React from "react";
// import { Button, Card, CardBody, CardText } from "reactstrap";
// function Post({post="This is default post value", content= "this is feed section"}){
//     return(
//         <Card className="border-0 shadow-sm">
//             <CardBody>
//                 <h1>{post.title}</h1>
//                 <CardText>{post.content}</CardText>
//             </CardBody>
//             <Button>Read More...</Button>
//         </Card>
//     )
// }

// export default Post;

import React, { useState } from "react";
import { Card, CardBody, CardImg, CardText, CardTitle, Button, FormGroup, Input, Row, Col } from "reactstrap";
// import './Post.css'; // Import the CSS file

// Sample data for the post
const samplePost = {
    user: {
        name: "John Doe",
        profilePhoto: "https://via.placeholder.com/50" // Replace with actual URL or image
    },
    media: {
        type: "image", // "image" or "video"
        src: "https://via.placeholder.com/600x400" // Replace with actual media URL
    },
    caption: "This is a sample caption for the post.",
    likes: 120,
    comments: [
        { user: "Jane Doe", text: "Nice post!" },
        { user: "Alice", text: "Great picture!" }
    ]
};

function Post() {
    const [likes, setLikes] = useState(samplePost.likes);
    const [comments, setComments] = useState(samplePost.comments);
    const [newComment, setNewComment] = useState("");

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleAddComment = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            setComments([...comments, { user: "Current User", text: newComment }]);
            setNewComment("");
        }
    };

    return (
        <Card className="post-card">
            <CardBody>
                <Row className="post-header">
                    <Col md={2}>
                        <img src={samplePost.user.profilePhoto} alt="Profile" className="post-profile-img" />
                    </Col>
                    <Col md={10}>
                        <CardTitle tag="h5" className="post-title">{samplePost.user.name}</CardTitle>
                    </Col>
                </Row>
                <CardBody className="post-media">
                    {samplePost.media.type === "image" && (
                        <CardImg top src={samplePost.media.src} alt="Post media" />
                    )}
                    {samplePost.media.type === "video" && (
                        <video controls width="100%">
                            <source src={samplePost.media.src} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    )}
                    <div className="post-caption">{samplePost.caption}</div>
                    <Button className="like-button" onClick={handleLike}>Like {likes}</Button>
                </CardBody>
                <div className="comment-section">
                    {comments.map((comment, index) => (
                        <div key={index} className="comment">
                            <strong>{comment.user}:</strong> {comment.text}
                        </div>
                    ))}
                    <form className="comment-form" onSubmit={handleAddComment}>
                        <Input
                            type="text"
                            value={newComment}
                            onChange={handleCommentChange}
                            placeholder="Add a comment..."
                            className="comment-input"
                        />
                        <Button className="comment-button" type="submit">Post</Button>
                    </form>
                </div>
            </CardBody>
        </Card>
    );
}

export default Post;
