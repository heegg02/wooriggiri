import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import styles from './styles/signUpForm.module.css';

function SignUpForm() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [isUsernameValid, setIsUsernameValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);
    const [isUsernameDuplicate, setIsUsernameDuplicate] = useState(false);

    const usernameHandleChange = async (e) => {
        const username = e.target.value;
        if (/^[a-zA-Z0-9]{5,12}$/.test(username)) {
            setIsUsernameValid(true);
            const response = await axios.get(`http://localhost:8080/auth/checkusername?username=${encodeURIComponent(username)}`);
            if (response.status === 200) {
                setIsUsernameDuplicate(response.data);
                setUsername(username);
            } else {
                console.error('Error:', response.status);
            }
        } else {
            setIsUsernameValid(false);
            setIsUsernameDuplicate(false);
        }
    };

    const passwordHandleChange = (e) => {
        const value = e.target.value;
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value)) {
            setIsPasswordValid(true);
            setPassword(value);
        } else {
            setIsPasswordValid(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        if (isUsernameValid && isPasswordValid && !isUsernameDuplicate) {
            try {
                const response = await axios.post('http://localhost:8080/auth/register', 
                    { 
                        username, 
                        password
                    },
                    { 
                        headers: { 'Content-Type': 'application/json' } 
                    }
                );
    
                if (response.status === 200) {
                    const accessToken = response.headers['access-token'];

                    localStorage.setItem('accessToken', accessToken);
                    navigate('/');
                } else {
                    console.error('Error:', response.status);
                }
            } catch (error) {
                console.error('An error occurred:', error);
            }
        } else {
            alert('아이디 또는 비밀번호를 확인해주세요.');
        }
    };

    const usernameValid = () => {
        if(!isUsernameValid) {
            return '5 ~ 12자 이내 영문자, 숫자';
        }
        if (isUsernameDuplicate) {
            return '이미 사용중인 아이디입니다.';
        } else {
            return '사용 가능한 아이디 입니다.';
        }
    }

    const passwordValid = () => {
        if(isPasswordValid) {
            return '사용 가능한 비밀번호 입니다.'
        } else {
            return '8자 이상, 영문자, 숫자 포함'
        }
    }

    return (
        <>  
            <h3>회원 가입</h3>
            <form onSubmit={handleSubmit}>
                <div className={styles.input_group}>
                    <label htmlFor="username">Id / User Name</label>
                    <input
                        type="text"
                        placeholder="아이디"
                        id="username"
                        name="username"
                        onChange={usernameHandleChange}
                    />
                    {usernameValid()}
                </div>
                <div className={styles.input_group}>
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        placeholder="비밀번호"
                        id="password"
                        name="password"
                        onChange={passwordHandleChange}
                    />
                    {passwordValid()}
                </div>
                <button className={styles.btn} type="submit">회원 가입</button>
            </form>
            <Link className={`${styles.a} ${styles.btn_signUp}`} to="/login">로그인으로</Link>
        </>
    );
} 

export default SignUpForm;