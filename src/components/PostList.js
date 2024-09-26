// src/components/PostList.js
import React, { useEffect, useState } from 'react';
import { searchPosts } from '/Users/aatikakhan/Blog-app/src/auth/Api.js';

const PostList = ({ keyword }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    searchPosts(keyword).then(response => setPosts(response.data)).catch(err => console.error(err));
  }, [keyword]);

  return (
    <div>
      {posts.map(post => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
          <button onClick={() => console.log(`Like post ${post.id}`)}>Like</button>
        </div>
      ))}
    </div>
  );
};

export default PostList;
