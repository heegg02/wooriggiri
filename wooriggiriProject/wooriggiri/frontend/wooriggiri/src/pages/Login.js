import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm.js';
import SignUpForm from '../components/SignUpForm.js'
import styles from './styles/login.module.css'

function Login() {

    return (
        <div className={styles.login_container}>
            <div className={styles.login_box}>
                <Link to="/"><h2>Wooriggiri</h2></Link>
                <Routes>
                    <Route path='/' element={ <LoginForm /> }/>
                    <Route path='signup' element={ <SignUpForm /> }/>
                </Routes>
            </div>
        </div>
    );
} 

export default Login;