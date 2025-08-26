// src/pages/NotFoundPage.js

const NotFound = ({ onNavigate }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-6xl font-extrabold text-gray-800 mb-4">404</h1>
      <p className="text-2xl text-gray-600 mb-8">Page Not Found</p>
      <a href="/" onClick={(e) => { e.preventDefault(); onNavigate('/'); }} className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition-colors">
        Go to Home
      </a>
    </div>
  );
};
export default NotFound;
