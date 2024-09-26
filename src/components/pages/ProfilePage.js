import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileHeader from './ProfileHeader'; 
import ProfileContent from './ProfileContent';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        console.log("Fetching user data..."); // Debug log
        const userResponse = await axios.get('http://100.28.49.102:9090/api/users/', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          }
        });

        const transformedUser = {
          picture: userResponse.data.profilepic ?? 'https://via.placeholder.com/150',
          name: userResponse.data.name,
          bio: userResponse.data.about ?? '', 
          postsCount: userResponse.data.totalPosts,
          followersCount: userResponse.data.followersCount ?? 0,
          followingCount: userResponse.data.followingCount ?? 0,
        };

        setUser(transformedUser);

        console.log("Fetching posts data..."); // Debug log
        const postsResponse = await axios.get('http://100.28.49.102:9090/api/users/posts/', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          }
        });

        setPosts(postsResponse.data);
      } catch (err) {
        console.error(err); // Log the error
        setError(err.response ? err.response.data.message : 'Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Default posts to display if API call fails or returns empty
  const defaultPosts = [
    { id: 1, title: 'My first post', excerpt: 'This is a summary of my first post.' },
    { id: 2, title: 'Another day in Backend Development', excerpt: 'Here’s a bit about my day.' },
  ];

  // Use fetched posts if available, otherwise use default posts
  const displayPosts = posts.length > 0 ? posts : defaultPosts;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="profile-page">
      {user && <ProfileHeader user={user} />}
      <ProfileContent posts={displayPosts} />
    </div>
  );
};

export default ProfilePage;
