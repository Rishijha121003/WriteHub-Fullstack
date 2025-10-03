// frontend/src/App.jsx

import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import CreatePost from './pages/CreatePost';
// Pages
import Home from './pages/Home';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import About from './pages/About';
import Signup from './pages/Signup';
import SinglePostPage from './pages/SinglePostPage';

// Layout Component
import Layout from './components/Layout'; // Layout को इम्पोर्ट करें

// 1. आपने About को दो बार इम्पोर्ट किया था, मैंने एक हटा दिया है।

const router = createBrowserRouter([
  {
    // 2. यह हमारा पेरेंट Layout Route है
    path: "/",
    element: <Layout />,
    // 3. इसके अंदर बाकी सारे पेज इसके children बन जाएंगे
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "/create-post",
            element: <CreatePost />,
          },
          { path: "/blog/:id", element: <SinglePostPage /> },
          // Yahan aur bhi protected routes aa sakte hain
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