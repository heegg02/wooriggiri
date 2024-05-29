import React, { useState, useEffect, useRef } from 'react';
import HeaderItem from './resource/HeaderItem.js'
import MainContent from './resource/MainContent.js'
import styles from './styles/Main.module.css';
import 'bootstrap-icons/font/bootstrap-icons.css'

function Main() {
    const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
    const buttonRefs = useRef([]);
    const sidebar_container = useRef(null);

    const toggleSidebar = () => {
        setIsSidebarExpanded(prevState => !prevState);
    };

    useEffect(() => {
        const buttons = buttonRefs.current;

        buttons.forEach(button => {
            if (button) {
                button.addEventListener('click', toggleSidebar);
            }
        });

        return () => {
            buttons.forEach(button => {
                if (button) {
                    button.removeEventListener('click', toggleSidebar);
                }
            });
        };
    }, []);

    const [isMouseEntered, setIsMouseEntered] = useState(isSidebarExpanded);

    const handleMouseEnter = () => {
        const sidebar = sidebar_container.current;
        setIsMouseEntered(true);
        sidebar.style.transform = 'translateX(0px)';
        sidebar.style.opacity = '1';
    };

    const handleMouseLeave = () => {
        const sidebar = sidebar_container.current;
        setIsMouseEntered(false);
        sidebar.style.transform = 'translateX(-260px)';
        sidebar.style.opacity = '0';
    };

    useEffect(() => {
        const sidebar = sidebar_container.current
        const button = buttonRefs.current[0]

        if (!isSidebarExpanded) {
             sidebar.addEventListener('mouseenter', handleMouseEnter);
             sidebar.addEventListener('mouseleave', handleMouseLeave);
             button.addEventListener('mouseenter', handleMouseEnter);
             button.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                sidebar.removeEventListener('mouseenter', handleMouseEnter);
                sidebar.removeEventListener('mouseleave', handleMouseLeave);
                button.removeEventListener('mouseenter', handleMouseEnter);
                button.removeEventListener('mouseleave', handleMouseLeave);
            };
        } else {
            sidebar.style.transform = 'translateX(0px)';
            sidebar.style.opacity = '1';
        }
    }, [isSidebarExpanded]);

    return (
        <div className={`${styles.container} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
            <div className={`${styles.header}`}>
                <div ref={el => buttonRefs.current[0] = el} className={`${styles.btn_header} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
                    <i className={`${!isMouseEntered ? 'bi bi-list' : 'bi bi-chevron-double-right'}`}></i>
                </div>
                <HeaderItem className={`${styles.header_item}`}/>
            </div>
            <div className={`${styles.sidebar}`}>
                <div ref={sidebar_container} className={`${styles.sidebar_container} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
                    <div className={`${styles.sidebar_header}`}>
                        <div className={`${styles.sidebar_header_item}`}><i class="bi bi-menu-up"> Menu</i></div>
                        <div ref={el => buttonRefs.current[1] = el} className={`${styles.sidebar_header_item} ${styles.btn_sidebar} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
                            <i className='bi bi-chevron-double-left'></i>
                        </div>
                    </div>
                </div>
            </div>
            <MainContent />
        </div>
    );
};

export default Main;