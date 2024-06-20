import React from 'react';
import styles from './styles/header.module.css'
import MainLogo from '../components/MainLogo.js'


function Header({ className }) {
    return (
        <div className={`${className} ${styles.header}`}>
            <div className={styles.header_item}>
                <MainLogo/>
            </div>
            {/* 
            <div className={`${styles.header_item}`}>
                <div className={`${styles.chatbot_btn}`}>chatbot</div>
            </div> 
            */}
        </div>
    );
} 

export default Header;
