import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/loginForm.module.css'

function LoginForm({ signUpClick }) {
    return (
        <>
            <h3>로그인</h3>
            <form>
                <div className={styles.input_group}>
                    <label htmlFor="username">Id</label>
                    <input type="text" placeholder="아이디" id="username" name="username" required />
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="비밀번호" id="password" name="password" required />
                </div>
                <button className={styles.btn} type="submit">Login</button>
            </form>
            <button className={styles.btn_signUp}><Link to="signup">회원 가입</Link></button>
        </>
    );
} 

export default LoginForm;