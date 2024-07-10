import React, { useState,useRef} from "react";
import styles from './styles/createPost.module.css'
import { useAuth } from '../../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreatePost({ boardId }) {
    const textarea = useRef();
    const { userProfile } = useAuth();
    const navigate = useNavigate();
    const [title, setTitle] = useState(null);
    const [content, setContent] = useState(null);

    const handleResizeHeight = () => {
        textarea.current.style.height = 'auto'; //height 초기화
        textarea.current.style.height = textarea.current.scrollHeight + 'px';
    };

    const handleChange = (e) => {
        handleResizeHeight();
        setContent(e.target.value);
    };

    function InsertPost() {
        const token = localStorage.getItem('accessToken');
        const userId = userProfile.id
        const fetch = async () => {
            const response = await axios.post(`http://localhost:8080/authapi/insertpost`,
                {
                    boardId,
                    userId,
                    title,
                    content
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                }
            );
            if (response.status === 200) {
                navigate(0);
            }
        };
        fetch();
    }
    return (
        <div className={styles.container}>
            <div>제목</div>
            <input className={styles.title} onChange={(e) => setTitle(e.target.value)}/>
            <div>본문</div>
            <textarea rows={1} className={styles.content} ref={textarea} onChange={handleChange}/>
            <div>
                <button onClick={() => InsertPost()}>등록</button>
            </div>
        </div>
    );
}

export default CreatePost;