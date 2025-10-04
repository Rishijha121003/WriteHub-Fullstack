import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search } from 'lucide-react';
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { authUser, setAuthUser } = useAuthContext();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(""); 

  // Dark mode logic
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Logout ka function
  const handleLogout = async () => {
    try {
      const res = await fetch('/api/v1/user/logout', {
        method: 'POST',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.success === false) throw new Error(data.message);
      
      setAuthUser(null);
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  // Search ka function
   const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm.trim()}`);
            setSearchTerm("");
        }
    };

  return (
    <div className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-600 border-b-2 border-gray-300 bg-white z-50'>
      <div className='max-w-7xl mx-auto flex justify-between items-center px-4 md:px-0'>
        
        {/* Logo + Search */}
        <div className='flex gap-7 items-center'>
          <Link to={'/'}>
            <div className='flex gap-2 items-center'>
              <img src={Logo} alt="WriteHub Logo" className='h-7 w-7 md:w-10 md:h-10 dark:invert' />
              <h1 className='font-bold text-2xl md:text-3xl dark:text-white'>WriteHub</h1>
            </div>
          </Link>

          {/* Search Bar - UPDATED SECTION */}
          <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-700 dark:bg-gray-900 bg-gray-300 w-[300px] rounded-full px-4 py-2 pr-12"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white p-2 rounded-full hover:bg-gray-800"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Nav Section */}
        <nav className='flex md:gap-7 gap-4 items-center'>
          <ul className='hidden md:flex gap-7 items-center text-lg font-semibold dark:text-gray-200'>
            <Link to={'/'} className="cursor-pointer"><li>Home</li></Link>
            <Link to={'/blogs'} className="cursor-pointer"><li>Blogs</li></Link>
            <Link to={'/about'} className="cursor-pointer"><li>About</li></Link>
          </ul>

          <div className='flex items-center gap-4'>
            <Button 
              className="p-2 rounded-full"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </Button>

            {/* Conditional Auth Buttons */}
            {
              authUser ? (
                // Agar user logged in hai
                <div className='flex items-center gap-3'>
                  {authUser.role === 'admin' && (
                    <Link to="/admin/dashboard">
                      <Button variant="secondary">Admin Panel</Button>
                    </Link>
                  )}
                  <Link to="/create-post">
                    <Button variant="outline">Create Post</Button>
                  </Link>
                  <span className='font-semibold dark:text-white hidden sm:block'>Hi, {authUser.firstName}</span>
                  <Button onClick={handleLogout} variant="destructive">Logout</Button>
                </div>
              ) : (
                // Agar user logged in nahi hai
                <div className='flex gap-2'>
                  <Link to={'/login'}><Button>Login</Button></Link>
                  <Link className='hidden md:block' to={'/signup'}><Button>Sign Up</Button></Link>
                </div>
              )
            }
          </div>
        </nav>
      </div>
    </div>
  )
}

export default Navbar;