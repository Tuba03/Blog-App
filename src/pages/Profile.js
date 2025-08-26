import React, { useState, useEffect } from 'react';
import { getProfile, followUser } from '../services/apiService';

const Profile = ({ onNavigate, userId }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const isOwnProfile = !userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          onNavigate('/login');
          return;
        }
        const data = await getProfile(token, userId);
        setProfile(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch profile.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [onNavigate, userId, token]);

  const handleFollow = async () => {
    try {
      await followUser(userId, token);
      // Re-fetch profile to update follower count
      const updatedProfile = await getProfile(token, userId);
      setProfile(updatedProfile);
      // Using an alert is a temporary solution for the sandbox environment
      // A modal or notification would be better in a real app.
      alert('Follow successful!');
    } catch (err) {
      alert(`Follow failed: ${err.message}`);
    }
  };

  if (loading) return <div className="max-w-2xl mx-auto my-10 p-8 text-center"><p className="text-gray-600">Loading profile...</p></div>;
  if (error) return <div className="max-w-2xl mx-auto my-10 p-8 text-center"><p className="text-red-600 font-semibold">{error}</p></div>;

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        {isOwnProfile ? 'My Profile' : `Profile of User ID ${userId}`}
      </h2>
      {profile && (
        <div className="space-y-4">
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-lg font-medium text-gray-700">User ID:</p>
            <p className="text-gray-900 font-mono break-all">{profile.id}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-lg font-medium text-gray-700">Email:</p>
            <p className="text-gray-900 break-all">{profile.email}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-md">
            <p className="text-lg font-medium text-gray-700">Total Blogs:</p>
            <p className="text-gray-900">{profile.total_blogs}</p>
          </div>
          {!isOwnProfile && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleFollow}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors"
              >
                Follow User
              </button>
            </div>
          )}
        </div>
      )}
      {isOwnProfile && (
        <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button onClick={() => onNavigate('/create-blog')} className="px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 transition-colors">Create New Blog</button>
          <button onClick={() => onNavigate('/my-blogs')} className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors">My Blogs</button>
          <button onClick={() => { localStorage.removeItem('token'); onNavigate('/login'); }} className="px-6 py-3 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 transition-colors">Logout</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
