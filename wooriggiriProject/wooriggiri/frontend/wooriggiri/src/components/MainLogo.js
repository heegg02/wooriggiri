import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/mainLogo.module.css'
import wooriggiriLogo  from '../assets/Logo.png'

function MainLogo() {
    return (
        <Link to="/" className={styles.logo_container}>
            <img className={styles.logo} src={wooriggiriLogo} alt="wooriggiri" />
            <span className={styles.logo_text}>Wooriggiri</span>
        </Link>
    );
} 

export default MainLogo;
