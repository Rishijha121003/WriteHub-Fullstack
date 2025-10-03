// frontend/src/pages/Signup.jsx

import React, { useState } from 'react'; // 1. Import useState
import auth from "../assets/auth.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Link, useNavigate } from "react-router-dom"; // 2. Import useNavigate
import { motion } from 'framer-motion';

const Signup = () => {
    // 3. State Management for form data, loading, and errors
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 4. Function to update state when user types
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
    };

    // 5. Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents page refresh
        
        // Client-side validation
        if (formData.password !== formData.confirmPassword) {
            return setError("Passwords do not match.");
        }

        try {
            setLoading(true);
            setError(null);

            const res = await fetch('/api/v1/user/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    email: formData.email,
                    password: formData.password,
                }),
            });
            const data = await res.json();

            if (data.success === false) {
                throw new Error(data.message);
            }

            setLoading(false);
            navigate('/login');

        } catch (err) {
            setLoading(false);
            setError(err.message);
        }
    };

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex h-screen md:pt-14 md:h-[760px]"
        >
            {/* Left Image */}
            <div className="hidden md:block">
                <img src={auth} alt="Auth" className="h-[700px]" />
            </div>

            {/* Right Form Section */}
            <div className="flex justify-center items-center flex-1 px-4 md:px-0">
                <Card className="w-full max-w-md p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                    <CardHeader>
                        <CardTitle>
                            <h1 className="text-center text-xl font-semibold">Create an Account</h1>
                        </CardTitle>
                        <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
                            Enter your details below to create your account
                        </p>
                    </CardHeader>
                    <CardContent>
                        {/* 6. Connect the form to the handleSubmit function */}
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <div className="flex gap-3">
                                <div className="flex-1">
                                    <Label htmlFor='firstName'>First Name</Label>
                                    <Input
                                        id="firstName" // ID is important for the handler
                                        type="text"
                                        placeholder="First Name"
                                        className="dark:border-gray-600 dark:bg-gray-500"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="flex-1">
                                    <Label htmlFor='lastName'>Last Name</Label>
                                    <Input
                                        id="lastName"
                                        type="text"
                                        placeholder="Last Name"
                                        className="dark:border-gray-600 dark:bg-gray-500"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div>
                                <Label htmlFor='email'>Email</Label>
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
                                <Label htmlFor='password'>Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter password"
                                    className="dark:border-gray-600 dark:bg-gray-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                                <Input
                                    id="confirmPassword"
                                    type="password"
                                    placeholder="Confirm password"
                                    className="dark:border-gray-600 dark:bg-gray-500"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="terms" className="h-4 w-4" required />
                                <Label htmlFor="terms" className="text-sm">
                                    I agree to the <span className="text-blue-600 cursor-pointer">Terms & Conditions</span>
                                </Label>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? 'Signing Up...' : 'Sign Up'}
                            </Button>

                            {/* 7. Display error messages if any */}
                            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

                            <p className="text-sm text-center mt-3">
                                Already have an account?{" "}
                                <Link to="/login" className="text-blue-600 hover:underline">
                                    Login
                                </Link>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}

export default Signup