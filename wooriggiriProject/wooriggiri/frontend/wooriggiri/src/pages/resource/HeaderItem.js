import React from 'react';
import styles from './styles/headerItem.module.css'

function HeaderItem({ className }) {
    return (
        <div className={ className }>
            <div className={styles.header_item}>
                <a href="/">wooriggiri</a>
            </div>
            <div className={`${styles.header_item} ${styles.end}`}>
                chatbot
            </div>
        </div>
    );
} 

export default HeaderItem;
