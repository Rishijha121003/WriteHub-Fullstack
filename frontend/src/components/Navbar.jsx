import React, { useState, useEffect } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, LogOut, LayoutDashboard, Shield, Menu, X } from 'lucide-react';
import { FaMoon, FaSun } from "react-icons/fa";
import { useAuthContext } from '../context/AuthContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { authUser, setAuthUser } = useAuthContext();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem('darkMode')) || false);
    
    useEffect(() => {
        document.documentElement.classList.toggle('dark', darkMode);
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const handleLogout = async () => {
        try {
            await fetch('/api/v1/user/logout', { method: 'POST', credentials: 'include' });
            setAuthUser(null);
            setIsMenuOpen(false);
            navigate('/login');
        } catch (error) { console.error("Logout failed:", error.message); }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?q=${searchTerm.trim()}`);
            setSearchTerm("");
            setIsMenuOpen(false);
        }
    };

    const activeLinkClass = "text-purple-600 dark:text-purple-400";
    const normalLinkClass = "hover:text-purple-600 transition-colors";

    return (
        <>
            <header className='py-2 fixed w-full dark:bg-gray-800 dark:border-b-gray-700 border-b bg-white z-40'>
                <div className='max-w-7xl mx-auto flex justify-between items-center px-4'>
                    
                    {/* --- LEFT SIDE: Hamburger (Mobile) + Logo --- */}
                    <div className="flex items-center gap-2">
                        <div className='md:hidden'>
                            <Button onClick={() => setIsMenuOpen(true)} variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </div>
                        <Link to={'/'} onClick={() => setIsMenuOpen(false)}>
                            <div className='flex gap-2 items-center'>
                                <img src={Logo} alt="WriteHub Logo" className='h-7 w-7 md:w-10 md:h-10 dark:invert' />
                                <h1 className='font-bold text-2xl md:text-3xl dark:text-white'>WriteHub</h1>
                            </div>
                        </Link>
                    </div>

                    {/* --- CENTER: Desktop Nav Links --- */}
                    <nav className='hidden md:flex items-center gap-7'>
                        <ul className='flex gap-7 items-center text-lg font-semibold dark:text-gray-300'>
                            <li><NavLink to={'/'} className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>Home</NavLink></li>
                            <li><NavLink to={'/blogs'} className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>Blogs</NavLink></li>
                            <li><NavLink to={'/about'} className={({ isActive }) => isActive ? activeLinkClass : normalLinkClass}>About</NavLink></li>
                        </ul>
                    </nav>

                    {/* --- RIGHT SIDE: Search, Dark Mode, Auth --- */}
                    <div className='flex items-center gap-4'>
                        {/* Desktop Search and Auth Buttons */}
                        <div className='hidden md:flex items-center gap-4'>
                            <form onSubmit={handleSearchSubmit} className="relative">
                                <Input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="border-gray-500 dark:bg-gray-900 bg-gray-200 w-[200px] rounded-full pr-10" />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"><Search className="w-4 h-4" /></button>
                            </form>
                            <Button variant="outline" size="icon" className="rounded-full" onClick={() => setDarkMode(!darkMode)}>{darkMode ? <FaSun /> : <FaMoon />}</Button>
                            {authUser ? (
                                <div className='flex items-center gap-2'>
                                  <Link to="/create-post"><Button>Create Post</Button></Link>
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild><Button variant="ghost" className="relative h-10 w-10 rounded-full"><Avatar className="h-10 w-10"><AvatarImage src={authUser.photoUrl || `https://avatar.vercel.sh/${authUser.email}.png`} /><AvatarFallback>{authUser.firstName.charAt(0)}</AvatarFallback></Avatar></Button></DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end">
                                      <DropdownMenuLabel>{authUser.firstName} {authUser.lastName}</DropdownMenuLabel><DropdownMenuSeparator />
                                      <Link to="/dashboard"><DropdownMenuItem className="cursor-pointer"><LayoutDashboard className="mr-2 h-4 w-4" /><span>Dashboard</span></DropdownMenuItem></Link>
                                      {authUser.role === 'admin' && <Link to="/admin/dashboard"><DropdownMenuItem className="cursor-pointer"><Shield className="mr-2 h-4 w-4" /><span>Admin Panel</span></DropdownMenuItem></Link>}
                                      <DropdownMenuSeparator />
                                      <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500 focus:text-red-500"><LogOut className="mr-2 h-4 w-4" /><span>Logout</span></DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                </div>
                            ) : (
                                <div className='flex gap-2'>
                                  <Link to={'/login'}><Button>Login</Button></Link>
                                  <Link to={'/signup'}><Button variant="outline">Sign Up</Button></Link>
                                </div>
                            )}
                        </div>
                        {/* Mobile Dark Mode Button */}
                        <div className='md:hidden'>
                            <Button variant="outline" size="icon" className="rounded-full" onClick={() => setDarkMode(!darkMode)}>{darkMode ? <FaSun /> : <FaMoon />}</Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- MOBILE MENU DRAWER --- */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} onClick={() => setIsMenuOpen(false)} className="fixed inset-0 bg-black/60 z-50 md:hidden" />
                        <motion.div initial={{ x: '-100%' }} animate={{ x: 0 }} exit={{ x: '-100%' }} transition={{ type: 'spring', stiffness: 300, damping: 30 }} className="fixed top-0 left-0 h-full w-80 bg-white dark:bg-gray-900 z-50 p-6 md:hidden">
                            <div className="flex justify-between items-center mb-8"><h2 className="text-xl font-bold">Menu</h2><Button onClick={() => setIsMenuOpen(false)} variant="ghost" size="icon"><X className="h-6 w-6" /></Button></div>
                            <nav className="flex flex-col space-y-2">
                                <NavLink to={'/'} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-semibold text-lg p-3 rounded-md ${isActive ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Home</NavLink>
                                <NavLink to={'/blogs'} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-semibold text-lg p-3 rounded-md ${isActive ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>Blogs</NavLink>
                                <NavLink to={'/about'} onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-semibold text-lg p-3 rounded-md ${isActive ? 'bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300' : 'hover:bg-gray-100 dark:hover:bg-gray-800'}`}>About</NavLink>
                                <div className='pt-6 mt-6 border-t w-full flex flex-col items-center space-y-3'>
                                    {authUser ? (
                                        <>
                                          <Link to="/create-post" className='w-full'><Button className="w-full text-md">Create Post</Button></Link>
                                          <Link to="/dashboard" className='w-full'><Button variant="outline" className="w-full text-md">Dashboard</Button></Link>
                                          <Button onClick={handleLogout} variant="destructive" className="w-full text-md">Logout</Button>
                                        </>
                                    ) : (
                                        <div className='w-full flex flex-col space-y-2'>
                                            <Link to={'/login'} className='w-full'><Button className="w-full text-md">Login</Button></Link>
                                            <Link to={'/signup'} className='w-full'><Button variant="outline" className="w-full text-md">Sign Up</Button></Link>
                                        </div>
                                    )}
                                </div>
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;