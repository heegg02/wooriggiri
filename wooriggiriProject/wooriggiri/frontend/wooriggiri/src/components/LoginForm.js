import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles/loginForm.module.css'

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
      
      const LoginUser = {
          email: email,
          password: password
      }
      try {
          const response = await axios.post('http://localhost:8080/api/login', LoginUser, {
              headers: {
                  'Content-Type': 'application/json'
              }
          });
      
          if (response.status === 200) {
              console.log('Login successful:', response.data);
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
            <Link to="/login/signup"><button className={styles.btn_signUp}>회원 가입</button></Link>
        </>
    );
} 

export default LoginForm;