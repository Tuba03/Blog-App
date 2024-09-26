// src/App.js
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Base from './components/Base';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import About from './components/pages/About';
import Services from './components/pages/Services';
import ProfilePage from './components/pages/ProfilePage';
import Userdashboard from './components/pages/user-routes/Userdashboard';
import Profileinfo from './components/pages/user-routes/Profileinfo';
import NewFeed from './components/NewFeed';
import Settings from './components/pages/Settings';
import ForgotPassword from './components/ForgotPassword';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import './styles/light.css';
import './styles/dark.css';

const AppContent = () => {
  const { theme } = useTheme();
  return (
    <div className={`app-container ${theme}-theme`}>
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/dashboard" element={<Userdashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/profile-info" element={<Profileinfo />} />
        <Route path="/NewFeed" element={<NewFeed />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
