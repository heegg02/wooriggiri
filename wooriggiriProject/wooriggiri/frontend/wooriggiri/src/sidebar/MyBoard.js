import React, { useEffect, useRef, useState } from 'react';
import styles from './styles/myBoard.module.css';

function MyBoard({ className }) {
    const containerRef = useRef();
    const [isScrollable, setIsScrollable] = useState(false);

    return (
        <div className={ className }>
            <div className={styles.container}>
                <div className={styles.item}>
                    aaa
                </div>
                <div className={styles.item}>
                    aaa
                </div>
                <div className={styles.item}>
                    aaa
                </div>
                <div className={styles.item}>
                    aaa
                </div>
                <div className={styles.item}>
                    aaa
                </div>
                <div className={styles.item}>
                    aaa
                </div>
                <div className={styles.item}>
                    aaa
                </div>
                <div className={styles.item}>
                    aaa
                </div>
            </div>
        </div>
    );
}

export default MyBoard;