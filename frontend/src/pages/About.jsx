// frontend/src/pages/About.jsx

import React from 'react';
import { FaFeatherAlt, FaUsers, FaLightbulb, FaConnectdevelop } from 'react-icons/fa';

const About = () => {
  return (
    // Main container now supports dark mode
    <div className="bg-white dark:bg-slate-900 text-gray-800 dark:text-gray-200 font-sans">

      {/* ===== Hero Section ===== */}
      <header
        className="relative h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1973&auto=format&fit=crop')" }}>
        {/* Overlay darkens slightly more in dark mode for better contrast */}
        <div className="absolute inset-0 bg-gray-900 bg-opacity-60 dark:bg-opacity-70"></div>

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-2">About WriteHub</h1>
          <p className="text-lg md:text-xl font-light">Empowering Writers and Readers Worldwide</p>
        </div>
      </header>

      {/* ===== Mission & Vision Section ===== */}
      <section className="bg-gray-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-center items-center">
            <div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Our Mission</h2>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                To provide a simple, powerful, and accessible platform where writers can share their stories, and readers can discover a world of creativity and knowledge.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100 mb-4">Our Vision</h2>
              <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                To build the world's most vibrant and supportive community for storytellers, fostering connections and inspiring the next generation of literary talent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Core Values Section ===== */}
      <section className="bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-16">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value Cards now support dark mode */}
            <div className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border-b-4 border-purple-600 dark:border-purple-500 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
              <FaFeatherAlt size={40} className="text-purple-600 dark:text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Creativity</h3>
              <p className="text-gray-600 dark:text-gray-400">We celebrate imagination and provide a canvas for every story.</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border-b-4 border-purple-600 dark:border-purple-500 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
              <FaUsers size={40} className="text-purple-600 dark:text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Community</h3>
              <p className="text-gray-600 dark:text-gray-400">We believe in the power of connection and mutual support.</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border-b-4 border-purple-600 dark:border-purple-500 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
              <FaLightbulb size={40} className="text-purple-600 dark:text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Innovation</h3>
              <p className="text-gray-600 dark:text-gray-400">We constantly improve our tools to enhance the writing experience.</p>
            </div>
            <div className="bg-gray-50 dark:bg-slate-800 p-8 rounded-xl border-b-4 border-purple-600 dark:border-purple-500 shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-xl text-center">
              <FaConnectdevelop size={40} className="text-purple-600 dark:text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-100 mb-2">Accessibility</h3>
              <p className="text-gray-600 dark:text-gray-400">Making storytelling tools available to everyone, everywhere.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Meet The Team Section ===== */}
      // frontend/src/pages/About.jsx (replace the old team section with this)

      {/* ===== About the Creator Section ===== */}
      <section className="bg-gray-50 dark:bg-slate-800">
        <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:py-24">
          <h2 className="text-4xl font-bold text-center text-slate-800 dark:text-slate-100 mb-16">About the Creator</h2>

          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-8 md:flex md:items-center md:gap-8">
            {/* Your Photo */}
            <div className="md:flex-shrink-0 text-center md:text-left">
              <img
                // यहाँ अपनी फोटो का URL या पाथ डालें
                src="https://i.pravatar.cc/150?u=rishi"
                alt="Rishi Kumar Jha"
                className="w-40 h-40 rounded-full object-cover mx-auto border-4 border-purple-500 dark:border-purple-400"
              />
            </div>

            {/* Your Bio */}
            <div className="mt-8 md:mt-0 text-center md:text-left">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Rishi Kumar Jha</h3>
              <p className="text-purple-600 dark:text-purple-400 font-semibold mb-4">Founder & Developer of WriteHub</p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Hi, I'm Rishi, the passionate developer behind WriteHub. My goal is to build a beautiful and intuitive space for writers to share their voice. This project is a labor of love, crafted with a deep appreciation for the art of storytelling. Thank you for being a part of this journey.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default About;