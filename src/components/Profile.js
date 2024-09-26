// src/components/Profile.js
import React from 'react';

const Profile = ({ user }) => (
  <div>
    <img src={user.picture} alt={user.name} />
    <h1>{user.name}</h1>
    <p>{user.bio}</p>
    <p>Posts: {user.postsCount}</p>
    <p>Followers: {user.followersCount}</p>
    <p>Following: {user.followingCount}</p>
  </div>
);

export default Profile;
