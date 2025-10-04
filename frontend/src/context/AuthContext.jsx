import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // YEH useEffect SABSE ZAROORI HAI
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const res = await fetch('/api/v1/user/profile', {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setAuthUser(data.user);
                } else {
                    setAuthUser(null);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setAuthUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []); // Empty array ka matlab yeh sirf ek baar chalega jab app load hoga

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
            {children}
        </AuthContext.Provider>
    );
};