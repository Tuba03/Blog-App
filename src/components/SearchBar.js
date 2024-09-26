// src/components/SearchBar.js
import React, { useState } from 'react';
import { searchPosts } from '/Users/aatikakhan/Blog-app/src/auth/Api.js';
import PostList from './PostList';

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearch = () => {
    searchPosts(keyword).then(response => setPosts(response.data));
  };

  return (
    <div>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search posts"
      />
      <button onClick={handleSearch}>Search</button>
      <PostList keyword={keyword} />
    </div>
  );
};

export default SearchBar;
