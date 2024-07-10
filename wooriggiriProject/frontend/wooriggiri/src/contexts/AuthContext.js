import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userProfile, setUserProfile] = useState(null);
    const [loginStatus, setLoginStatus] = useState(null);
    
    const login = (user) => {
        console.log(user);
        setUserProfile(user);
        setLoginStatus(true);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        setLoginStatus(false);
        setUserProfile(null);
    };

    return (
        <AuthContext.Provider value={{ login, logout, loginStatus, userProfile, setUserProfile, setLoginStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
