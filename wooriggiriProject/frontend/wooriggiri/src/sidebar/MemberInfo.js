import React from "react";
import styles from './styles/memberInfo.module.css'
import { useAuth } from '../contexts/AuthContext.js';
import { Link } from 'react-router-dom';

function MemberInfo() {
    const { logout, userProfile } = useAuth();
    const username = userProfile.username;

    return (
        <div className={ styles.container }>
            <p>{username} 님</p>
            <div className={styles.btnBox}>
                <Link to={`/user/${username}`}>내 정보</Link>
                <div onClick={() => logout() }>로그아웃</div>
            </div>
        </div>
    );
}

export default MemberInfo;