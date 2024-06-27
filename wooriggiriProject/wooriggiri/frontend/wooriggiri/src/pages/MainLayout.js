import React, { useState, useEffect } from 'react';
import Header from '../header/Header.js'
import Sidebar from '../sidebar/Sidebar.js'
import Content from '../content/Content.js'
import styles from './styles/Main.module.css';

import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.js';

function Main( { children } ) {
    const { logout, login } = useAuth();

    useEffect(() => {
        const fetchUserProfile = async () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:8080/auth/user', {
                        headers: { 'Authorization': `Bearer ${token}` },
                    });
                    if (response.status === 200) {
                        login(response.data);
                    } else {
                        logout();
                    }
                } catch (error) {
                    logout();
                }
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div className={`${styles.container} `}>
            <Header className={`${styles.header}`} />
            <Sidebar className={`${styles.sidebar}`}/>
            <Content className={`${styles.content}`}>
                { children }
            </Content>
        </div>
    );
};

export default Main;