import React from "react";
import { useNavigate  } from 'react-router-dom';
import styles from './styles/loginBtn.module.css'

function LoginBtn() {
    const navigate = useNavigate ();
    
    const goToLogin = () => {
        navigate('/Login')
    }

    return (
        <button onClick={ goToLogin } className={`${styles.btn}`}>
            <i className="bi bi-person-circle"/>aaa
        </button>
    );
}

export default LoginBtn;