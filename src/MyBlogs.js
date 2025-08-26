import React, { useState, useEffect } from 'react';
import { getMyBlogs } from '../services/apiService';

const MyBlogs = ({ onNavigate }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        if (!token) {
          setError('No token found. Please log in.');
          setLoading(false);
          onNavigate('/login');
          return;
        }
        const fetchedBlogs = await getMyBlogs(token);
        setBlogs(fetchedBlogs);
      } catch (err) {
        setError(err.message || 'Failed to fetch your blogs.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, [onNavigate, token]);

  const handleBlogClick = (blogId) => {
    onNavigate(`/blog/${blogId}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">My Blogs</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading your blogs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow duration-200"
                onClick={() => handleBlogClick(blog.id)}
              >
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4 truncate">{blog.content}</p>
                <p className="text-sm text-gray-500">
                  By User ID: <span className="font-medium">{blog.owner_id}</span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">You haven't created any blogs yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyBlogs;
