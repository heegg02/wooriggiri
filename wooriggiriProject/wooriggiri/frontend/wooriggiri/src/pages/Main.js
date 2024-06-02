import React, { useState } from 'react';
import Header from '../components/Header.js'
import Sidebar from '../components/Sidebar.js'
import MainContent from '../components/MainContent.js'
import styles from './styles/Main.module.css';

function Main({  }) {
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