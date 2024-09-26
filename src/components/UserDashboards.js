// src/components/UserDashboards.js
import React from 'react';
import { getUserSavedPosts, getUserLikedPosts } from '/Users/aatikakhan/Blog-app/src/auth/Api.js';

const UserDashboards = ({ userId }) => {
  const [savedPosts, setSavedPosts] = React.useState([]);
  const [likedPosts, setLikedPosts] = React.useState([]);

  React.useEffect(() => {
    getUserSavedPosts(userId).then(response => setSavedPosts(response.data));
    getUserLikedPosts(userId).then(response => setLikedPosts(response.data));
  }, [userId]);

  return (
    <div>
      <h2>Your Saved Posts</h2>
      {savedPosts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
      <h2>Your Liked Posts</h2>
      {likedPosts.map(post => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
        </div>
      ))}
    </div>
  );
};

export default UserDashboards;
