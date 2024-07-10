import React from 'react';
import styles from './styles/content.module.css';

function Content({ className, children }) {
    return (
        <div className={`${className} ${styles.content}`}>
            { children }
        </div>
    );
} 

export default Content;