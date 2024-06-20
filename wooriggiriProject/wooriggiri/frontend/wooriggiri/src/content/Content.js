import React from 'react';
import styles from './styles/content.module.css';
import { Route, Routes, Link } from 'react-router-dom';
import MainContent from './MainContent.js';

function Content({ className, children }) {
    return (
        <div className={className}>
            { children }
        </div>
    );
} 

export default Content;