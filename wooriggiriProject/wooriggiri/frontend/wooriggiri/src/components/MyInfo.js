import React from "react";
import LoginBtn from './LoginBtn.js'
import styles from './styles/myInfo.module.css'

function MyInfo() {
    return (
        <div className={`${styles.container}`}>
            <LoginBtn />
        </div>
    );
}

export default MyInfo;