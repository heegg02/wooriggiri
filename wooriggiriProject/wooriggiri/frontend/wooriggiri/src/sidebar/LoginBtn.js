import React from "react";
import { useNavigate  } from 'react-router-dom';
import styles from './styles/loginBtn.module.css'
import { useAuth } from '../contexts/AuthContext.js';

function LoginBtn() {
    const navigate = useNavigate ();
    const { loginStatus, login } = useAuth();
    
    const goToLogin = () => {
        login();
        // navigate('/login');
    }
    
    return (
        <button onClick={ goToLogin } className={`${styles.btn}`}>
            <i className="bi bi-person-circle"/>로그인
        </button>
    );
}

export default LoginBtn;