// src/components/PostDetail.js
import React, { useEffect, useState } from 'react';
import { getPostViews, getLikedUsers, getPostShares } from '../api';

const PostDetail = ({ postId }) => {
  const [postDetails, setPostDetails] = useState({});
  const [views, setViews] = useState(0);
  const [likedUsers, setLikedUsers] = useState([]);
  const [shares, setShares] = useState([]);

  useEffect(() => {
    // Fetch post details here
    // For example purposes, assuming postDetails contains relevant info
    // Update these based on API responses
    getPostViews(postId).then(response => setViews(response.data.views));
    getLikedUsers(postId).then(response => setLikedUsers(response.data));
    getPostShares(postId).then(response => setShares(response.data));
  }, [postId]);

  return (
    <div>
      <h1>{postDetails.title}</h1>
      <p>{postDetails.content}</p>
      <p>Views: {views}</p>
      <p>Liked by: {likedUsers.join(', ')}</p>
      <p>Shares: {shares.length}</p>
    </div>
  );
};

export default PostDetail;
