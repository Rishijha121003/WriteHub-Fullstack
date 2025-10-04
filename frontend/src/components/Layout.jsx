import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Toaster } from 'react-hot-toast'; // 1. Toaster ko import karo

const Layout = () => {
  const { loading } = useAuthContext();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" /> {/* 2. Toaster ko yahan add karo */}
      <Navbar />
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;