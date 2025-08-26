import React, { useState, useEffect } from 'react';
import { getAllBlogs } from '../services/apiService';

const Home = ({ onNavigate }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const fetchedBlogs = await getAllBlogs();
        setBlogs(fetchedBlogs);
      } catch (err) {
        setError('Failed to fetch blogs. Please check the backend server.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleBlogClick = (blogId) => {
    onNavigate(`/blog/${blogId}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Home Feed</h1>
      {isAuthenticated && (
        <div className="text-center mb-8">
          <button
            onClick={() => onNavigate('/my-blogs')}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 transition-colors"
          >
            View My Blogs
          </button>
        </div>
      )}
      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
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
            <p className="text-center text-gray-500">No blogs found. Be the first to create one!</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
