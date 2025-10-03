import React from 'react';
import { useState } from 'react';
import auth from "../assets/auth.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';
import { useAuthContext } from '../context/AuthContext';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { setAuthUser } = useAuthContext(); // setAuthUser yahan pehle se hai

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            setError(null);
            const res = await fetch('/api/v1/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success === false) {
                throw new Error(data.message);
            }

            // 👇 YEH LINE ADD KI GAYI HAI 👇
            // User ki details ko global context mein set karo
            setAuthUser(data.user);

            setLoading(false);
            navigate('/');
        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <div className="flex h-screen md:h-[760px]">
            {/* Left Image */}
            <div className="hidden md:block w-1/2">
                <img src={auth} alt="Auth" className="h-full w-full object-cover" />
            </div>

            {/* Right Form Section */}
            <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 300, opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-center items-center w-full md:w-1/2 px-4 md:px-0"
            >
                <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-center text-xl font-semibold">Login</h1>
                        </CardTitle>
                        <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
                            Enter your credentials to access your account
                        </p>
                    </CardHeader>
                    <CardContent>
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="dark:border-gray-600 dark:bg-gray-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    className="dark:border-gray-600 dark:bg-gray-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="remember" className="h-4 w-4" />
                                <Label htmlFor="remember" className="text-sm">Remember me</Label>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Logging In...' : 'Login'}
                            </Button>
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                            <p className="text-sm text-center mt-3">
                                Don't have an account?{" "}
                                <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    )
}

export default Login;