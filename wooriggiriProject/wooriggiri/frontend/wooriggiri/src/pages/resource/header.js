import React from 'react';
import styles from './header.module.css';

function Header() {
    return (
        <div className={styles.header}>
            <a className={`${styles.inlineBlock} ${styles.floatLeft}`} href="/">wooriggiri</a>
        </div>
    );
} 

export default Header;
