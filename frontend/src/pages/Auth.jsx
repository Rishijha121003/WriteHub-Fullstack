import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import auth from "../assets/auth.jpg";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const formVariants = {
    hidden: { opacity: 0, x: isLogin ? 100 : -100 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isLogin ? -100 : 100 },
  };

  return (
    <div className="flex h-screen md:pt-14 md:h-[760px] bg-gray-50 dark:bg-gray-900">
      {/* Left Side: Image */}
      <motion.div
        key={isLogin ? "loginImage" : "signupImage"}
        initial={{ opacity: 0, x: isLogin ? -100 : 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: isLogin ? 100 : -100 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="hidden md:flex flex-1 justify-center items-center"
      >
        <img
          src={auth}
          alt="Auth"
          className="h-[700px] w-auto rounded-lg shadow-lg object-cover"
        />
      </motion.div>

      {/* Right Side: Form */}
      <div className="flex justify-center items-center flex-1 px-4 md:px-0 overflow-hidden">
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="loginForm"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full max-w-md"
            >
              <Card className="p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                <CardHeader>
                  <CardTitle>
                    <h1 className="text-center text-xl font-semibold">Login</h1>
                  </CardTitle>
                  <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
                    Enter your credentials to access your account
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        className="dark:border-gray-600 dark:bg-gray-500"
                      />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        className="dark:border-gray-600 dark:bg-gray-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="remember" className="h-4 w-4" />
                      <Label htmlFor="remember" className="text-sm">
                        Remember me
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                    <p className="text-sm text-center mt-3">
                      Don’t have an account?{" "}
                      <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setIsLogin(false)}
                      >
                        Sign Up
                      </span>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="signupForm"
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="w-full max-w-md"
            >
              <Card className="p-6 shadow-lg rounded-2xl dark:bg-gray-800 dark:border-gray-600">
                <CardHeader>
                  <CardTitle>
                    <h1 className="text-center text-xl font-semibold">Create an Account</h1>
                  </CardTitle>
                  <p className="mt-2 text-sm font-serif text-center dark:text-gray-300">
                    Enter your details below to create your account
                  </p>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <Label>First Name</Label>
                        <Input
                          type="text"
                          placeholder="First Name"
                          name="firstName"
                          className="dark:border-gray-600 dark:bg-gray-500"
                        />
                      </div>
                      <div className="flex-1">
                        <Label>Last Name</Label>
                        <Input
                          type="text"
                          placeholder="Last Name"
                          name="lastName"
                          className="dark:border-gray-600 dark:bg-gray-500"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        name="email"
                        className="dark:border-gray-600 dark:bg-gray-500"
                      />
                    </div>
                    <div>
                      <Label>Password</Label>
                      <Input
                        type="password"
                        placeholder="Enter password"
                        name="password"
                        className="dark:border-gray-600 dark:bg-gray-500"
                      />
                    </div>
                    <div>
                      <Label>Confirm Password</Label>
                      <Input
                        type="password"
                        placeholder="Confirm password"
                        name="confirmPassword"
                        className="dark:border-gray-600 dark:bg-gray-500"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="terms" className="h-4 w-4" />
                      <Label htmlFor="terms" className="text-sm">
                        I agree to the{" "}
                        <span className="text-blue-600 cursor-pointer">
                          Terms & Conditions
                        </span>
                      </Label>
                    </div>
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                    <p className="text-sm text-center mt-3">
                      Already have an account?{" "}
                      <span
                        className="text-blue-600 hover:underline cursor-pointer"
                        onClick={() => setIsLogin(true)}
                      >
                        Login
                      </span>
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Auth;
