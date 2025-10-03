import React from 'react';
import { useAuthContext } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const { authUser, loading } = useAuthContext();

    // Jab tak auth status check ho raha hai, kuch na dikhao
    if (loading) {
        return null;
    }

    // Agar user logged in hai, toh children components (e.g., CreatePost page) dikhao
    // Agar nahi, toh login page par redirect kar do
    return authUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;