import React from "react";
import LoginBtn from './LoginBtn.js'
import MemberInfo from './MemberInfo.js'
import styles from './styles/myInfo.module.css'
import { useAuth } from '../contexts/AuthContext.js';

function MyInfo() {
    const { loginStatus } = useAuth();
    
    return (
        <div className={`${styles.container}`}> 
            { loginStatus ? <MemberInfo/> : <LoginBtn/> }
        </div>
    );
}

export default MyInfo;