// src/pages/SingleBlogPage.js
import React, { useState, useEffect } from 'react';
const SingleBlogPage = ({ blogId, onNavigate }) => {
  const [blog, setBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const fetchedBlog = await getBlogById(blogId, token);
        setBlog(fetchedBlog);
        // Mock comments as backend not implemented
        setComments([{ id: 1, content: "Great post!", author_id: 1 }]);
      } catch (err) {
        setError(err.message || 'Failed to fetch blog post.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId, token]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      // Mock API call since backend not ready for comments
      // await addCommentToBlog(blogId, newComment, token);
      alert('Comment added!');
      setComments([...comments, { id: Date.now(), content: newComment, author_id: "You" }]);
      setNewComment('');
    } catch (err) {
      alert(`Failed to add comment: ${err.message}`);
    }
  };

  const handleLike = async () => {
    try {
      // Mock API call since backend not ready for likes
      // await likeBlog(blogId, token);
      alert('You liked this blog!');
    } catch (err) {
      alert(`Failed to like: ${err.message}`);
    }
  };

  const handleSave = async () => {
    try {
      // Mock API call since backend not ready for saves
      // await saveBlog(blogId, token);
      alert('Blog saved!');
    } catch (err) {
      alert(`Failed to save: ${err.message}`);
    }
  };

  if (loading) return <div className="max-w-4xl mx-auto my-10 p-8 text-center"><p className="text-gray-600">Loading blog post...</p></div>;
  if (error) return <div className="max-w-4xl mx-auto my-10 p-8 text-center"><p className="text-red-600 font-semibold">{error}</p></div>;

  return (
    <div className="max-w-4xl mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <button onClick={() => window.history.back()} className="mb-4 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors">← Go Back</button>
      <h1 className="text-4xl font-bold mb-4 text-gray-800">{blog.title}</h1>
      <p className="text-gray-600 mb-6 whitespace-pre-wrap">{blog.content}</p>
      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-8">
        <p>By User ID: <span className="font-medium cursor-pointer hover:underline" onClick={() => onNavigate(`/user/${blog.owner_id}`)}>{blog.owner_id}</span></p>
        <button onClick={handleLike} className="flex items-center space-x-1 hover:text-red-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" /></svg>
          <span>Like</span>
        </button>
        <button onClick={handleSave} className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M5 4a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2H5zm0 2h10v6H5V6zM10 16a1 1 0 100-2 1 1 0 000 2z" /></svg>
          <span>Save</span>
        </button>
      </div>

      <div className="mt-8 pt-8 border-t border-gray-200">
        <h3 className="text-2xl font-bold mb-4 text-gray-800">Comments</h3>
        <ul className="space-y-4 mb-6">
          {comments.map((comment) => (
            <li key={comment.id} className="bg-gray-50 p-4 rounded-md shadow-sm">
              <p className="text-sm font-semibold text-gray-800">User {comment.author_id}:</p>
              <p className="text-gray-600 mt-1">{comment.content}</p>
            </li>
          ))}
        </ul>
        <form onSubmit={handleCommentSubmit} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            rows="3"
            required
          ></textarea>
          <button type="submit" className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors">
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};
