import React, { useState } from 'react';
import Header from '../components/Header.js'
import Sidebar from '../components/Sidebar.js'
import Content from '../components/Content.js'
import styles from './styles/Main.module.css';

function Main( { children } ) {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarExpanded(prevState => !prevState);
    };

    return (
        <div className={`${styles.container} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
            <Header className={`${styles.header}`} />
            <Sidebar className={`${styles.sidebar}`} toggleSidebar={ toggleSidebar } isSidebarExpanded={ isSidebarExpanded }/>
            <Content className={`${styles.content}`}>
                { children }
            </Content>
        </div>
    );
};

export default Main;