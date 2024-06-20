import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/loginForm.module.css'
import { useAuth } from '../contexts/AuthContext.js';

function LoginForm() {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const response = await axios.post('http://localhost:8080/auth/login', 
            {
                username: username,
                password: password
            },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        
            if (response.status === 200) {
                const accessToken = response.headers['accesstoken'];

                login(accessToken);
                navigate('/');
            } else {
                console.error('Error:', response.status);
            }
      } catch (error) {
          alert('An error occurred:', error);
      }
  };

    return (
        <>
            <h3>로그인</h3>
            <form onSubmit={ handleSubmit }>
                <div className={styles.input_group}>
                    <label htmlFor="username">Id / User Name</label>
                    <input
                        type="text"
                        placeholder="아이디"
                        id="username"
                        name="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
            <Link to="/signup"><button className={styles.btn_signUp}>회원 가입</button></Link>
        </>
    );
} 

export default LoginForm;