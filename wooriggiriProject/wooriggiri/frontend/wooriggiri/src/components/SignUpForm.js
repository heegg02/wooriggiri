import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import styles from './styles/signUpForm.module.css'

function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { username, password };

        fetch('http://localhost:8080/api/signup', {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <>  
            <h3>회원 가입</h3>
            <form>
            <div className={styles.input_group}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    placeholder="이메일"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                    />
            </div>
            <div className={styles.input_group}>
                <label htmlFor="username">User Name</label>
                <input
                    type="text"
                    placeholder="활동명"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    />
            </div>
            <button className={styles.btn} type="submit">회원 가입</button>
            </form>
            <Link to="/Login"><button className={styles.btn_signUp}>로그인으로</button></Link>
        </>
    );
} 

export default SignUpForm;