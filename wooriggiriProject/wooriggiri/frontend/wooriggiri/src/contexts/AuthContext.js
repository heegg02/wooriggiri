import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loginStatus, setLoginStatus] = useState(false);

    const login = () => {
        setLoginStatus(true);
    }

    const logout = () => {
        setLoginStatus(false);
    }
    // const login = async (accessToken, refreshToken) => {
    //     console.log("얍")
    //     const response = await axios.get('http://localhost:8080/test/test', {
    //         withCredentials: true
    //     });
    //     console.log(response);
    //     sessionStorage.setItem('accessToken', accessToken);
    //     document.cookie = refreshToken
    // };

    // const logout = async () => {
    //     try {
    //         sessionStorage.removeItem('accessToken');
    
    //         const response = await axios.get('http://localhost:8080/auth/logout', {
    //         });
    
    //         console.log('Logout successful:', response.data);
    //     } catch (error) {
    //         console.error('Error during logout:', error);
    //     }
    // };

    return (
        <AuthContext.Provider value={{ login, logout, loginStatus, setLoginStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
