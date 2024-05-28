import React, { useState, useEffect, useRef } from 'react';
import styles from "./sidebar.module.css";


const Sidebar = ({ width=300, children }) => {
    const [isToggle, setToggle] = useState(true);
    const [xPosition, setXPosition] = useState(0);
    const side = useRef();

    const toggleMenu = () => {
        if (!isToggle) {
            setXPosition(0);
            setToggle(true);
        } else {
            setToggle(false);
        }
    };

    useEffect(() => {
        const sidebar = side.current;

        if (!isToggle) {
            const handleMouseEnter = () => {
              setXPosition(0);
            };
      
            const handleMouseLeave = () => {
              setXPosition(width - 20);
            };
            
            sidebar.addEventListener('mouseenter', handleMouseEnter);
            sidebar.addEventListener('mouseleave', handleMouseLeave);

            return () => {
                sidebar.removeEventListener('mouseenter', handleMouseEnter);
                sidebar.removeEventListener('mouseleave', handleMouseLeave);
            };
        }

    });

  return (
    <aside>
        <div ref={side} className={styles.container} style={{transform: `translatex(${xPosition}px)`}}>
            <div className={`${styles.sidebar} ${isToggle ? styles.on : styles.off}`}>
                <button onClick={() => toggleMenu()} className={styles.button} >
                    {isToggle ? 
                    <span>True</span> : <span>false</span>
                    }
                </button>
                <div className={styles.content}>{children}</div>
            </div>
        </div>
    </aside>
  );
};

export default Sidebar;