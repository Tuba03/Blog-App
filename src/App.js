// // import logo from './logo.svg';
// // import './App.css';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import Base from './components/Base';
// // import {BrowserRouter, Routes, Route} from 'react-router-dom';
// // import Home from './components/pages/Home';
// // import Login from './components/pages/Login';
// // import Signup from './components/pages/Signup';
// // import About from './components/pages/About';
// // import Services from './components/pages/Services';
// // import Userdashboard from './components/pages/user-routes/Userdashboard';
// // import PrivateRoute from './components/PrivateRoute';
// // import Profileinfo from './components/pages/user-routes/Profileinfo';
// // import NewFeed from './components/NewFeed';
// // import ProfileHeader from './components/ProfileHeader';
// // import ProfileContent from './components/ProfileContent';
// // import './styles.css';

// // function App() {
// //   return (
    
// //     <BrowserRouter>
// //       <Routes>
// //         <Route path="/Home" element={<Home />} />
// //         <Route path="/" element={<Base />} />
// //         <Route path="/Login" element={<Login />} />
// //         <Route path="/Signup" element={<Signup />} />
// //         <Route path="/About" element={<About />} />
// //         <Route path="/Services" element={<Services />} />
// //         <Route path="/dashboard" element={<Userdashboard />}   />          // remove it after api config     
// //         <Route path="profile-info" element={<Profileinfo />} />     // also remove this
// //         <Route path="/NewFeed" element={<NewFeed />} />     // also remove this
// //         {/* <Route path="/user" element={<PrivateRoute />}>
// //           <Route path="dashboard" element={<Userdashboard />} />
// //           <Route path="profile-info" element={<Profileinfo />} />
// //         </Route> */}

// //       </Routes>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;
// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Base from './components/Base';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './components/pages/Home';
// import Login from './components/pages/Login';
// import Signup from './components/pages/Signup';
// import About from './components/pages/About';
// import Services from './components/pages/Services';
// import Userdashboard from './components/pages/user-routes/Userdashboard';
// import Profileinfo from './components/pages/user-routes/Profileinfo';
// import NewFeed from './components/NewFeed';
// import ProfileHeader from './components/ProfileHeader';
// import ProfileContent from './components/ProfileContent';
// import Settings from './components/pages/Settings';
// import ForgotPassword from './components/ForgotPassword';
// // Sample user and posts data
// const user = {
//   picture: 'https://via.placeholder.com/150',
//   name: 'John Doe',
//   bio: 'Software developer. Tech enthusiast. Coffee lover.',
//   postsCount: 42,
//   followersCount: 1200,
//   followingCount: 300,
// };

// const posts = [
//   { id: 1, title: 'My first post', excerpt: 'This is a summary of my first post.' },
//   { id: 2, title: 'Another day in paradise', excerpt: 'Here’s a bit about my day.' },
// ];

// // ProfilePage component to include ProfileHeader and ProfileContent
// const ProfilePage = () => (
//   <div className="profile-page">
//     <ProfileHeader user={user} />
//     <ProfileContent posts={posts} />
//   </div>
// );

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Base />} />
//         <Route path="/Home" element={<Home />} />
//         <Route path="/Login" element={<Login/>} />
//         <Route path="/Signup" element={<Signup />} />
//         <Route path="/About" element={<About />} />
//         <Route path="/Services" element={<Services />} />
//         <Route path="/dashboard" element={<Userdashboard />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/profile-info" element={<Profileinfo />} />
//         <Route path="/NewFeed" element={<NewFeed />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path='/settings' element={<Settings />} />
//         <Route path='/ForgotPassword' element={<ForgotPassword />} />
//         {/* <Route path="/user" element={<PrivateRoute />}>
//           <Route path="dashboard" element={<Userdashboard />} />
//           <Route path="profile-info" element={<Profileinfo />} />
//         </Route> */}
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;


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
import Userdashboard from './components/pages/user-routes/Userdashboard';
import Profileinfo from './components/pages/user-routes/Profileinfo';
import NewFeed from './components/NewFeed';
import ProfileHeader from './components/ProfileHeader';
import ProfileContent from './components/ProfileContent';
import Settings from './components/pages/Settings';
// import ForgotPassword from './components/ForgotPassword';
import ForgotPassword from './components/ForgotPassword';
import ThemeToggle from './components/ThemeToggle';
import { ThemeProvider, useTheme } from './context/ThemeContext';
// import { ToastContainer } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
import './styles/light.css';
import './styles/dark.css';

// const AppContent = () => {
//   const { theme } = useTheme();
// // Sample user and posts data
// // const user = {
// //   picture: 'https://via.placeholder.com/150',
// //   name: 'Bilal Khan',
// //   bio: 'Java developer. Tech enthusiast. Bike lover.',
// //   postsCount: 42,
// //   followersCount: 1200,
// //   followingCount: 300,
// // };

// // const posts = [
// //   { id: 1, title: 'My first post', excerpt: 'This is a summary of my first post.' },
// //   { id: 2, title: 'Another day in Backend Development', excerpt: 'Here’s a bit about my day.' },
// // ];

// // ProfilePage component to include ProfileHeader and ProfileContent
// // const ProfilePage = () => (
// //   <div className="profile-page">
// //     <ProfileHeader user={user} />
// //     <ProfileContent posts={posts} />
// //   </div>
// );
//   return (
//     <div className={`app-container ${theme}-theme`}>
//       <ThemeToggle />
//       <Routes>
//         <Route path="/" element={<Base />} />
//         <Route path="/Home" element={<Home />} />
//         <Route path="/Login" element={<Login />} />
//         <Route path="/Signup" element={<Signup />} />
//         <Route path="/About" element={<About />} />
//         <Route path="/Services" element={<Services />} />
//         <Route path="/dashboard" element={<Userdashboard />} />
//         <Route path="/profile" element={<ProfilePage />} />
//         <Route path="/profile-info" element={<Profileinfo />} />
//         <Route path="/NewFeed" element={<NewFeed />} />
//         <Route path="/settings" element={<Settings />} />
//         <Route path="/ForgotPassword" element={<ForgotPassword />} />
//         {/* <Route path="/user" element={<PrivateRoute />}>
//           <Route path="dashboard" element={<Userdashboard />} />
//           <Route path="profile-info" element={<Profileinfo />} />
//         </Route> */}
//       </Routes>
//     </div>
//   );
// };

import ProfilePage from './components/pages/ProfilePage'; // Adjust the path as necessary

const AppContent = () => {
  const { theme } = useTheme();

  return (
    <div className={`app-container ${theme}-theme`}>
      <ThemeToggle />
      <Routes>
        <Route path="/" element={<Base />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/About" element={<About />} />
        <Route path="/Services" element={<Services />} />
        <Route path="/dashboard" element={<Userdashboard />} />
        <Route path="/profile" element={<ProfilePage />} /> {/* Use actual ProfilePage */}
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
    <ThemeProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

// src/App.js// src/App.js

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// // import Home from './components/pages/Home';
// import Login from './components/pages/Login';
// import Signup from './components/pages/Signup';
// import About from './components/pages/About';
// import Services from './components/pages/Services';
// import Settings from './components/pages/Settings';
// import ProfilePage from './components/pages/ProfilePage';
// import ThemeToggle from './components/ThemeToggle';
// import { ThemeProvider } from './context/ThemeContext';
// import './styles/light.css';
// import './styles/dark.css';
// import Homes from './components/pages/Homes';
// import Userdashboard from './components/pages/user-routes/Userdashboard';
// import ForgotPassword from './components/ForgotPassword';
// import UserProfile from './components/userss/UserProfile';
// import UpdatePreferences from './components/userss/Updateprefrences';
// import UpdatePassword from './components/userss/UpdatePassword';
// // import UserDashboards from './components/UseDashboards.js';
// import UserList from './components/userss/UserList';

// const App = () => {
//   return (
//     <ThemeProvider>
//       <Router>
//         <Navbar />
//         <ThemeToggle />
//         <Routes>
//           {/* <Route path="/" element={<Homes />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/about" element={<About />} />
//           <Route path="/services" element={<Services />} />
//           <Route path="/settings" element={<Settings />} />
//           <Route path="/profile" element={<ProfilePage />} /> */}
//           {/* <Route path='/dash' element={<UserDashboards />} /> */}
//           {/* <Route path='/userdash' element={<Userdashboard />} /> */}
//           {/* <Route path="/ForgotPassword" element={<ForgotPassword />} /> */}
//           {/* <Route path="/" element={<UserList />} />
//           <Route path="/user/:userId" element={<UserProfile />} />
//           <Route path="/user/:userId/update-preferences" element={<UpdatePreferences />} />
//           <Route path="/user/:userId/update-password" element={<UpdatePassword />} /> */}
//         </Routes>
//       </Router>
//     </ThemeProvider>
//   );
// };

// export default App;
