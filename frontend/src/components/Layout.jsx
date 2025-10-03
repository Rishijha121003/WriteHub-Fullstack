// frontend/src/components/Layout.jsx

import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer'; // अगर आपके पास Footer कंपोनेंट है तो इसे इम्पोर्ट करें
import { Outlet } from 'react-router-dom'; // Outlet को इम्पोर्ट करें

const Layout = () => {
  return (
    <>
      <Navbar />
      {/* Outlet की जगह पर आपके बाकी पेज (Home, About, etc.) रेंडर होंगे */}
      <main className="flex-grow pt-20">
        <Outlet />
      </main>
      {/* आप चाहें तो यहाँ एक Footer भी जोड़ सकते हैं */}
      <Footer /> 
    </>
  );
};

export default Layout;