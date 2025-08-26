// src/pages/Signup.js
import React, { useState } from 'react';
import { signupUser } from '../services/apiService';

const Signup = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (!email || !password) throw new Error('Please fill in all fields.');
      if (password.length < 8) throw new Error('Password must be at least 8 characters long.');
      const response = await signupUser(email, password);
      setMessage(`Signup successful for user with ID: ${response.id}. You can now log in.`);
      setTimeout(() => onNavigate('/login'), 2000);
    } catch (error) {
      setMessage(error.message || 'Signup failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Sign Up</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <button type="submit" disabled={loading} className={`w-full py-2 rounded-md font-semibold transition-colors duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 text-white hover:bg-green-700'}`}>{loading ? 'Signing up...' : 'Sign Up'}</button>
      </form>
      {message && <p className={`mt-6 text-center text-sm font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      <div className="mt-6 text-center text-gray-600">
        Already have an account? <a href="/login" onClick={(e) => { e.preventDefault(); onNavigate('/login'); }} className="text-blue-600 hover:underline font-medium">Log in</a>
      </div>
    </div>
  );
};

export default Signup;