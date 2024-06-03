import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm.js';
import SignUpForm from '../components/SignUpForm.js'
import MainLogo from '../components/MainLogo.js'
import styles from './styles/login.module.css'

function Login() {

    return (
        <div className={styles.login_container}>
            <div className={styles.login_box}>
                <MainLogo/>
                <Routes>
                    <Route path='/' element={ <LoginForm /> }/>
                    <Route path='signup' element={ <SignUpForm /> }/>
                </Routes>
            </div>
        </div>
    );
} 

export default Login;