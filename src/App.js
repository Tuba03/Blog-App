import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MyBlogs from './pages/MyBlogs';
import CreateBlog from './pages/CreateBlog';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';

const App = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const onNavigate = (pathname) => {
    window.history.pushState({}, '', pathname);
    setCurrentPath(pathname);
  };

  const renderPage = () => {
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (pathSegments.length === 0) {
      return <Home onNavigate={onNavigate} />;
    }

    switch (pathSegments[0]) {
      case 'explore':
        return <Explore onNavigate={onNavigate} />;
      case 'my-blogs':
        return <MyBlogs onNavigate={onNavigate} />;
      case 'create-blog':
        return <CreateBlog onNavigate={onNavigate} />;
      case 'profile':
        if (pathSegments.length > 1) {
          const userId = pathSegments[1];
          return <Profile onNavigate={onNavigate} userId={userId} />;
        }
        return <Profile onNavigate={onNavigate} />;
      case 'settings':
        return <Settings onNavigate={onNavigate} />;
      case 'login':
        return <Login onNavigate={onNavigate} />;
      case 'signup':
        return <Signup onNavigate={onNavigate} />;
      case 'blog':
        // A placeholder for the Blog Detail page.
        // You'll need to create a BlogDetailPage component similar to the others.
        const blogId = pathSegments[1];
        return <div>Blog Detail Page for ID: {blogId}</div>; 
      default:
        return <NotFound onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <Header onNavigate={onNavigate} />
      <main className="container mx-auto px-4">
        {renderPage()}
      </main>
    </div>
  );
};

export default App;