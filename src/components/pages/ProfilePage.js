import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchProfilePic = async (url, authToken) => {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Accept': 'image/*',
      },
      responseType: 'blob',
    });

    const imageUrl = URL.createObjectURL(response.data); // Create a URL from the blob
    return imageUrl; // Return the blob URL
  };

  useEffect(() => {
    const fetchProfileData = async () => {
      const authToken = localStorage.getItem("authToken");

      try {
        console.log("Fetching user data...");
        const userResponse = await axios.get('http://100.28.49.102:9090/api/users/', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          }
        });

        const userData = userResponse.data[0];

        // Fetch the profile picture using the fetchProfilePic function
        const profilePicUrl = `http://100.28.49.102:9090/api/users/profilepic/image/?url=${userData.profilepic}`;
        const pictureUrl = await fetchProfilePic(profilePicUrl, authToken); // Use the new function

        const transformedUser = {
          picture: pictureUrl, // Use the blob URL
          name: userData.name,
          bio: userData.about,
          postsCount: userData.totalPosts,
          followersCount: userData.followersCount ?? 0,
          followingCount: userData.followingCount ?? 0,
        };

        setUser(transformedUser);

        console.log("Fetching posts data...");
        const postsResponse = await axios.get('http://100.28.49.102:9090/api/users/posts/', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
          }
        });

        setPosts(postsResponse.data);
      } catch (err) {
        console.error(err);
        setError(err.response ? err.response.data.message : 'Error fetching profile data');
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

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
