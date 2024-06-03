import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/loginForm.module.css'

function LoginForm({ signUpClick }) {
    return (
        <>
            <h3>로그인</h3>
            <form>
                <div className={styles.input_group}>
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="이메일" id="email" name="email" required />
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="비밀번호" id="password" name="password" required />
                </div>
                <button className={styles.btn} type="submit">로그인</button>
            </form>
            <Link to="/Login/SignUp"><button className={styles.btn_signUp}>회원 가입</button></Link>
            
        </>
    );
} 

export default LoginForm;