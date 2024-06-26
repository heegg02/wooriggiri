import React from "react";
import styles from './styles/sidebarItem.module.css'
import MyBoard from './MyBoard.js'

function SidebarItem() {
    
    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <div className={`${styles.item} ${styles.title}`}>
                    내 게시판
                </div>
                <MyBoard className={styles.item}/>
            </div>
            <div className={styles.list}>
                <div className={`${styles.item} ${styles.title}`}>
                    내 커뮤니티
                </div>
            </div>
            <div className={styles.list}>
                <div className={`${styles.item} ${styles.title}`}>
                    즐겨찾는 커뮤니티
                </div>
            </div>
        </div>
    );
}

export default SidebarItem;