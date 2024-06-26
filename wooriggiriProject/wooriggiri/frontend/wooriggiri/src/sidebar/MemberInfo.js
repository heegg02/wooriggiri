import React from "react";
import styles from './styles/loginBtn.module.css'
import { useAuth } from '../contexts/AuthContext.js';

function MemberInfo() {
    const { logout } = useAuth();
    const username = "HEEgg";

    return (
        <div className={ styles.memberInfoContainer }>
            <p>{username} 님</p>
            <button onClick={ logout }>로그아웃</button>
        </div>
    );
}

export default MemberInfo;