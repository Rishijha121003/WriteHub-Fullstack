import { createContext, useContext, useState } from "react";

// 1. Global box (Context) banaya
export const AuthContext = createContext();

// 2. Ek custom hook banaya taaki context ko use karna aasan ho
export const useAuthContext = () => {
    return useContext(AuthContext);
};

// 3. Provider component banaya jo poore app ko user data dega
export const AuthContextProvider = ({ children }) => {
    // Shuru mein, koi user logged in nahi hai
    const [authUser, setAuthUser] = useState(null);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};