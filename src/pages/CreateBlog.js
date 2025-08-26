// src/pages/CreateBlogPage.js

import React, { useState } from 'react';
import { createBlog } from '../services/apiService';

const CreateBlog = ({ onNavigate }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (!token) {
        setMessage('No token found. Please log in to create a blog.');
        setLoading(false);
        return;
      }
      if (!title || !content) throw new Error('Please fill in both the title and content.');
      await createBlog(title, content, token);
      setMessage('Blog created successfully!');
      setTitle('');
      setContent('');
      setTimeout(() => onNavigate('/'), 1500);
    } catch (error) {
      setMessage(error.message || 'Failed to create blog.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="title">Title</label>
          <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required/>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1" htmlFor="content">Content</label>
          <textarea id="content" value={content} onChange={(e) => setContent(e.target.value)} disabled={loading} className="w-full h-48 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none" required></textarea>
        </div>
        <button type="submit" disabled={loading} className={`w-full py-3 rounded-md font-semibold text-lg transition-colors duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{loading ? 'Publish Blog' : 'Publish Blog'}</button>
      </form>
      {message && <p className={`mt-6 text-center font-medium ${message.includes('success') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
    </div>
  );
};

export default CreateBlog;
