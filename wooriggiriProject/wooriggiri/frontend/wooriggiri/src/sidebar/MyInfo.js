import React from "react";
import LoginBtn from './LoginBtn.js'
import MemberInfo from './MemberInfo.js'
import styles from './styles/myInfo.module.css'
import { useAuth } from '../contexts/AuthContext.js';

function MyInfo() {
    const { loginStatus } = useAuth();
    function isLogin() {
        if (loginStatus) {
            return <MemberInfo/>
        }
        return <LoginBtn/>
    };
    return (
        <div className={`${styles.container}`}> 
            { isLogin() }
        </div>
    );
}

export default MyInfo;