import React from 'react';
import MainLogo from '../components/MainLogo.js'
import styles from './styles/login.module.css'

function Login({ children }) {

    return (
        <div className={styles.login_container}>
            <div className={styles.login_box}>
                <MainLogo/>
                { children }
            </div>
        </div>
    );
} 

export default Login;