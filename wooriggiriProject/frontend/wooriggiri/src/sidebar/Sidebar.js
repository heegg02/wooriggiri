import React, { useState, useEffect, useRef } from 'react';
import MyInfo from './MyInfo.js'
import SidebarContent from './SidebarContent.js'
import styles from './styles/sidebar.module.css'
import { useAuth } from '../contexts/AuthContext.js';

import Modal from '../components/Modal.js';
import CreateBoard from './CreateBoard.js';

function Sidebar({ className }) {
    const [ isSidebarExpanded, setIsSidebarExpanded ] = useState(true);
    const buttonRef = useRef();
    const { loginStatus } = useAuth();
    const sidebar_boxRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const toggleSidebar = () => {
        setIsSidebarExpanded(prevState => !prevState);
    };

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

    function sidebarContent() {
        if(loginStatus) {
            return <SidebarContent openModal={openModal}/>
        }
    }
    
    return (
        <div className={`${ className } ${styles.sidebar} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
            <div ref={ sidebar_boxRef } className={`${styles.sidebar_box} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
                <div>
                    <div className={`${styles.sidebar_box_header}`}>
                        <div className={`${styles.sidebar_box_header_item}`}>
                            <i className='bi bi-menu-up'/> Menu
                        </div>
                        <i ref={ buttonRef } className={`${styles.sidebar_box_header_item} bi ${isSidebarExpanded ? 'bi-chevron-double-left' : 'bi-chevron-double-right'}`}></i>
                    </div>
                </div>
                <div className={`${styles.sidebar_box_list}`}>
                    <MyInfo/>
                    { sidebarContent() }
                </div>
            </div>
            <Modal title={"게시판 생성"} isOpen={isModalOpen} onClose={closeModal}><CreateBoard/></Modal>
        </div>
    );
}

export default Sidebar;
