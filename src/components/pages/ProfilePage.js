import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmNAMTIzLmNvbSIsImV4cCI6MTcyNzM4MTAyMywiaWF0IjoxNzI3MzYzMDIzfQ.UaOrmrVhLb8tm8uDMI5nb90Te3bXmCRtylckrHajSyfEgXgNkhLSR2g_8TXNWwcStHcMu5JkfNaFLPluX38pXw'; // Replace with your token

      try {
        const userResponse = await axios.get('http://100.28.49.102:9090/api/users/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
          }
        });

        setUser(userResponse.data);

        const postsResponse = await axios.get('http://100.28.49.102:9090/api/users/posts/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': '*/*',
          }
        });

        setPosts(postsResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err); // Log the error
        setError(err.response ? err.response.data.message : 'Error fetching profile data');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {user && (
        <div>
          <h1>{user.name}</h1>
          <img src={user.picture} alt={user.name} style={{ width: 150, height: 150, borderRadius: '50%' }} />
          <p>{user.bio}</p>
          <p>Posts: {user.postsCount}</p>
          <p>Followers: {user.followersCount}</p>
          <p>Following: {user.followingCount}</p>
        </div>
      )}
      <h2>Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfilePage;
