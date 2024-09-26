
import React from 'react';
import './ProfileContent';

const ProfileContent = ({ posts }) => {
  return (
    <div className="profile-content">
      {posts.map(post => (
        <div className="post mt-2" key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <a href={`/post/${post.id}`} className="read-more">Read more</a>
        </div>
      ))}
    </div>
  );
};

export default ProfileContent;
