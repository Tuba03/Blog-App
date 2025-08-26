import React, { useState } from 'react';

const Header = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isAuthenticated = !!localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    onNavigate('/login');
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }} className="text-2xl font-bold text-gray-800">
          My Blog App
        </a>
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              )}
            </svg>
          </button>
        </div>
        <div className={`md:flex items-center space-x-4 ${isMenuOpen ? 'flex flex-col mt-4 md:mt-0 md:flex-row' : 'hidden'}`}>
          <a
            href="/"
            onClick={(e) => { e.preventDefault(); onNavigate('/'); }}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="/explore"
            onClick={(e) => { e.preventDefault(); onNavigate('/explore'); }}
            className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            Explore
          </a>
          {!isAuthenticated ? (
            <>
              <a
                href="/login"
                onClick={(e) => { e.preventDefault(); onNavigate('/login'); }}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Login
              </a>
              <a
                href="/signup"
                onClick={(e) => { e.preventDefault(); onNavigate('/signup'); }}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Signup
              </a>
            </>
          ) : (
            <>
              <a
                href="/create-blog"
                onClick={(e) => { e.preventDefault(); onNavigate('/create-blog'); }}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Create Blog
              </a>
              <a
                href="/profile"
                onClick={(e) => { e.preventDefault(); onNavigate('/profile'); }}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Profile
              </a>
              <a
                href="/settings"
                onClick={(e) => { e.preventDefault(); onNavigate('/settings'); }}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Settings
              </a>
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
