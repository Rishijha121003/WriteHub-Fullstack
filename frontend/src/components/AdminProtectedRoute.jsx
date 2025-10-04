import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminProtectedRoute = () => {
    const { authUser, loading } = useAuthContext();

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>;
    }

    // Check karo ki user logged in hai AUR uska role 'admin' hai
    return (authUser && authUser.role === 'admin') ? <Outlet /> : <Navigate to="/" />;
};

export default AdminProtectedRoute;