import React from 'react';
import styles from './styles/signUpForm.module.css'

function SignUpForm({ loginClick }) {
    return (
        <>  
            <h3>회원 가입</h3>
            <form>
            <div className={styles.input_group}>
                <label htmlFor="username">Id</label>
                <input type="text" placeholder="아이디" id="username" name="username" required />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="password">Password</label>
                <input type="password" placeholder="비밀번호" id="password" name="password" required />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="password">Email</label>
                <input type="email" placeholder="이메일" id="email" name="email" required />
            </div>
            <button className={styles.btn} type="submit">Login</button>
            </form>
            <button onClick={loginClick} className={styles.btn_signUp}>aaaaaa</button>
        </>
    );
} 

export default SignUpForm;