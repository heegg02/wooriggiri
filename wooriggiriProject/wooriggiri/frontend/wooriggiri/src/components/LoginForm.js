import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles/loginForm.module.css'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
    
        try {
          const response = await axios.post('http://localhost:8080/login', {
            email,
            password,
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
    
          if (response.status === 200) {
            
            window.location.href = '/';
          }
        } catch (err) {
          setError('로그인 실패. 사용자 이름과 비밀번호를 확인하세요.');
          console.log(error);
        }
      };

    return (
        <>
            <h3>로그인</h3>
            <form onSubmit={ handleSubmit }>
                <div className={styles.input_group}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="이메일"
                        id="email"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        id="password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.btn} type="submit">로그인</button>
            </form>
            <Link to="/Login/SignUp"><button className={styles.btn_signUp}>회원 가입</button></Link>
            
        </>
    );
} 

export default LoginForm;