import React from "react";
import LoginBtn from './LoginBtn.js'
import MemberInfo from './MemberInfo.js'
import styles from './styles/myInfo.module.css'

function MyInfo() {
    return (
        <div className={`${styles.container}`}>
            <LoginBtn/>
            <MemberInfo/>
        </div>
    );
}

export default MyInfo;