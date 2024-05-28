import React, { useState, useEffect, useRef } from 'react';
import styles from "./sidebar.module.css";


const Sidebar = ({ width=280, children }) => {
    const [isToggle, setToggle] = useState(true);
    const [xPosition, setXPosition] = useState(0);
    const side = useRef();



    const toggleMenu = () => {
        if (!isToggle) {
            setXPosition(0);
            setToggle(true);
        } else {
            setXPosition(20-width);
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
              setXPosition(20 - width);
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
    <div className={styles.container}>
        <div ref={side}  className={styles.sidebar} style={{ width: `${width}px`, height: '100%',  transform: `translatex(${-xPosition}px)`}}>
            <button onClick={() => toggleMenu()} className={styles.button} >
                {isToggle ? 
                <span>True</span> : <span>false</span>
                }
            </button>
            <div className={styles.content}>{children}</div>
        </div>
    </div>
  );
};


export default Sidebar;