// src/pages/Home.js
import React from 'react';
import SearchBar from '/Users/aatikakhan/Blog-app/src/components/SearchBar.js';
import PostList from '/Users/aatikakhan/Blog-app/src/components/PostList.js';

const Homes = () => (
  <div>
    <h1>Home</h1>
    <SearchBar />
    <PostList keyword="" />
  </div>
);

export default Homes;
