import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './styles/signUpForm.module.css';

function SignUpForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(username, password);
        try {
            const response = await axios.post('http://localhost:8080/auth/register', 
                { 
                    username, 
                    password,
                    email
                },
                { 
                    headers: { 'Content-Type': 'application/json' } 
                }
            );

            if (response.status === 200) {
                console.log("User registered successfully");
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    return (
        <>  
            <h3>회원 가입</h3>
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        placeholder="이메일"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <button className={styles.btn} type="submit">회원 가입</button>
            </form>
            <Link to="/login"><button className={styles.btn_signUp}>로그인으로</button></Link>
        </>
    );
} 

export default SignUpForm;
