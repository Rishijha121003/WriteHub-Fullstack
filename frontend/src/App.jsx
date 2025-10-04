// frontend/src/App.jsx

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchResultsPage from './pages/SearchResultsPage';

// Pages
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import About from './pages/About';
import SinglePostPage from './pages/SinglePostPage';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Auth from './pages/Auth'; // 👈 New animated auth page

// Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // --- Public Routes ---
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/blog/:id", element: <SinglePostPage /> },
      { path: "/about", element: <About /> },
      { path: "/auth", element: <Auth /> }, // 👈 New combined login/signup page
      { path: "/search", element: <SearchResultsPage /> },

      // --- Logged-in User Routes ---
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/create-post", element: <CreatePost /> },
          { path: "/edit-post/:id", element: <EditPost /> },
          { path: "/dashboard", element: <UserDashboard /> },
        ]
      },

      // --- Admin Routes ---
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
  return <RouterProvider router={router} />;
};

export default App;
