import React, { useState } from 'react';
import { loginUser } from '../services/apiService';

const Login = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      if (!email || !password) throw new Error('Please fill in all fields');
      const res = await loginUser(email, password);
      localStorage.setItem('token', res.access_token);
      setMessage('Login successful! Redirecting...');
      setTimeout(() => onNavigate('/profile'), 1500);
    } catch (error) {
      setMessage(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto my-10 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Email</label>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <div>
          <label className="block text-gray-700 mb-1">Password</label>
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"/>
        </div>
        <button type="submit" disabled={loading} className={`w-full py-2 rounded-md font-semibold transition-colors duration-200 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}>{loading ? 'Logging in...' : 'Login'}</button>
      </form>
      {message && <p className={`mt-6 text-center text-sm font-medium ${message.includes('successful') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}
      <div className="mt-6 text-center text-gray-600">
        Don't have an account? <a href="/signup" onClick={(e) => { e.preventDefault(); onNavigate('/signup'); }} className="text-blue-600 hover:underline font-medium">Sign up</a>
      </div>
    </div>
  );
};

export default Login;
