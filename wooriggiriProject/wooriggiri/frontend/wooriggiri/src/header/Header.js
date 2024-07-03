import React from 'react';
import styles from './styles/header.module.css'
import MainLogo from '../components/MainLogo.js'
import SearchBox from './SearchBox.js'

function Header({ className }) {
    return (
        <div className={`${className} ${styles.header}`}>
            <MainLogo/>
            <SearchBox/>
        </div>
    );
} 

export default Header;