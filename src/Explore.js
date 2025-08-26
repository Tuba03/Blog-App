import React, { useState, useEffect } from 'react';
import { getAllBlogs } from '../services/apiService';

const Explore = ({ onNavigate }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredBlogs = blogs.filter(blog =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBlogClick = (blogId) => {
    onNavigate(`/blog/${blogId}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Explore Blogs</h1>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search blogs by title or content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      {loading ? (
        <p className="text-center text-gray-500">Loading blogs...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="space-y-6">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((blog) => (
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
            <p className="text-center text-gray-500">No blogs match your search.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Explore;
