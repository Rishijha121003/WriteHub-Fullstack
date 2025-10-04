// frontend/src/App.jsx

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchResultsPage from './pages/SearchResultsPage'; 

// Pages
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import About from './pages/About';
import Signup from './pages/Signup';
import SinglePostPage from './pages/SinglePostPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import AdminDashboard from './pages/AdminDashboard'; // Admin page import karo

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute'; // Admin protect route import karo

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // --- Public Routes ---
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blog/:id", element: <SinglePostPage /> },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <About /> },
      { path: "/signup", element: <Signup /> },
      { path: "/search", element: <SearchResultsPage /> },
      
      // --- Logged-in User ke liye Protected Routes ---
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/create-post", element: <CreatePost /> },
          { path: "/edit-post/:id", element: <EditPost /> },
        ]
      },

      // --- Sirf Admin ke liye Protected Routes ---
      {
        element: <AdminProtectedRoute />,
        children: [
          { path: "/admin/dashboard", element: <AdminDashboard /> },
        ]
      }
    ]
  },
]);

const App = () => {
  return (
    <RouterProvider router={router} />
  );
};

export default App;