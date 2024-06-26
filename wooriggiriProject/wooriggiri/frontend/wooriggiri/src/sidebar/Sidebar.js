import React, { useState, useEffect, useRef } from 'react';
import MyInfo from './MyInfo.js'
import SidebarContent from './SidebarContent.js'
import styles from './styles/sidebar.module.css'
import axios from 'axios';

import { useAuth } from '../contexts/AuthContext.js';

function Sidebar({ className }) {
    const [ isSidebarExpanded, setIsSidebarExpanded ] = useState(true);
    const buttonRef = useRef();
    const { loginStatus } = useAuth();

    

    useEffect(() => {
        const button = buttonRef.current;

        if (button) {
            button.addEventListener('click', toggleSidebar)
        }

        return () => {
            if (button) {
                button.removeEventListener('click', toggleSidebar);
            }

        }
    });

    const sidebar_boxRef = useRef();
    
    useEffect(() => {
        const sidebar_box = sidebar_boxRef.current;

        const handleMouseEnter = () => {
            sidebar_box.style.transform = 'translateX(0px)';
            sidebar_box.style.opacity = '1';
        }
        const handleMouseLeave = () => {
            sidebar_box.style.transform = 'translateX(-260px)';
            sidebar_box.style.opacity = '0';
        }

        if (!isSidebarExpanded) {
            sidebar_box.addEventListener('mouseenter', handleMouseEnter)
            sidebar_box.addEventListener('mouseleave', handleMouseLeave)

            return () => {
                sidebar_box.removeEventListener('mouseenter', handleMouseEnter)
                sidebar_box.removeEventListener('mouseleave', handleMouseLeave)
            }
        } else {
            sidebar_box.style.transform = 'translateX(0px)';
            sidebar_box.style.opacity = '1';
        }
    }, [isSidebarExpanded]);

    const toggleSidebar = () => {
        setIsSidebarExpanded(prevState => !prevState);
    };

    return (
        <div className={`${ className } ${styles.sidebar} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
            <div ref={ sidebar_boxRef } className={`${styles.sidebar_box} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
                <div>
                    <div className={`${styles.sidebar_box_header}`}>
                        <div className={`${styles.sidebar_box_header_item}`}>
                            <i className='bi bi-menu-up'/>
                            Menu
                        </div>
                        <div ref={ buttonRef } className={`${styles.sidebar_box_header_item}`}>
                            <i className={`bi ${isSidebarExpanded ? 'bi-chevron-double-left' : 'bi-chevron-double-right'}`}></i>
                        </div>
                    </div>
                </div>
                <div className={`${styles.sidebar_box_list}`}>
                    <MyInfo/>
                    { loginStatus ? <SidebarContent/> : '' }
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
