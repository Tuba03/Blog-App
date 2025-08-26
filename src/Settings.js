// src/pages/Settings.js
import React, { useState } from 'react';
import { updateProfile } from '../services/apiService';

const Settings = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [profilePhoto, setProfilePhoto] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (!token) {
        setMessage('No token found. Please log in.');
        setLoading(false);
        return;
      }
      await updateProfile(token, name, profilePhoto);
      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage(error.message || 'Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="name">Name</label>
          <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="profilePhoto">Profile Photo URL</label>
          <input id="profilePhoto" type="text" value={profilePhoto} onChange={(e) => setProfilePhoto(e.target.value)} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <button type="submit" disabled={loading} className={`w-full py-3 rounded-md font-semibold text-lg transition-colors duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{loading ? 'Saving...' : 'Save Changes'}</button>
      </form>
      {message && <p className={`mt-6 text-center font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </div>
  );
};

export default Settings;