import React from "react";
import styles from './styles/loginBtn.module.css'
import { useAuth } from '../contexts/AuthContext.js';

function MemberInfo() {
    const { logout } = useAuth();
    const username = "HEEgg";

    return (
        <div className={ styles.memberInfoContainer }>
            <h3>{username} 님</h3>
            <div>
                <button onClick={ logout }>로그아웃</button>
                <button onClick={ logout }>로그아웃</button>
            </div>
        </div>
    );
}

export default MemberInfo;