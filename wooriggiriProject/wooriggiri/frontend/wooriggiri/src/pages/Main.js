import React, { useState, useEffect, useRef } from 'react';
import Header from './resource/Header.js'
import Sidebar from './resource/Sidebar.js'
import MainContent from './resource/MainContent.js'
import styles from './styles/Main.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function Main() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(prevState => !prevState);
    };

    return (
        <div className={`${styles.container} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
            <Header className={`${styles.header}`} />
            <Sidebar className={`${styles.sidebar}`} toggleSidebar={ toggleSidebar } isSidebarExpanded={ isSidebarExpanded }/>
            <MainContent className={`${styles.mainContent}`} />
        </div>
    );
};

export default Main;