import React, { useState, useEffect, useRef } from 'react';
import styles from './styles/sidebar.module.css'

function Sidebar({ className, toggleSidebar, isSidebarExpanded }) {
    const buttonRef = useRef();

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

    const [isMouseEntered, setIsMouseEntered] = useState(isSidebarExpanded);
    const sidebar_boxRef = useRef();



    useEffect(() => {
        const sidebar_box = sidebar_boxRef.current;

        const handleMouseEnter = () => {
            setIsMouseEntered(true);
            sidebar_box.style.transform = 'translateX(0px)';
            sidebar_box.style.opacity = '1';
        }
        const handleMouseLeave = () => {
            setIsMouseEntered(false);
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

    return (
        <div className={`${ className } ${styles.sidebar}`}>
            <div ref={ sidebar_boxRef } className={`${styles.sidebar_box} ${isSidebarExpanded ? styles.expended : styles.collapsed}`}>
                <div className={`${styles.sidebar_box_item}`}>
                    <div className={`${styles.sidebar_box_header}`}>
                        <div className={`${styles.sidebar_box_header_item}`}>
                            <i className='bi bi-menu-up'> Menu</i>
                        </div>
                        <div ref={ buttonRef } className={`${styles.sidebar_box_header_item}`}>
                            <i className={ isSidebarExpanded ? 'bi bi-chevron-double-left' : 'bi bi-chevron-double-right' }></i>
                        </div>
                    </div>
                </div>
                <div className={`${styles.sidebar_box_item}`}>aa</div>
            </div>
        </div>
    );
}

export default Sidebar;
