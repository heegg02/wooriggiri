import React, { useEffect, useState } from 'react';
import styles from './styles/comment.module.css'
import { useAuth } from '../../contexts/AuthContext.js';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function Comment({postId}) {
    const navigate = useNavigate();
    const [data , setData] = useState(null);
    const [visibleForms, setVisibleForms] = useState({});
    const { loginStatus, userProfile } = useAuth();
    
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:8080/api/comment?postId=${postId}`);
            if (response.status === 200) {
                // console.log(response.data)
                setData(response.data);
            }
        };
        fetch();
    }, [])

    const handleFormSubmit = async (event, parentCommentId) => {
        event.preventDefault();
        const token = localStorage.getItem('accessToken');
        const comment = event.target.elements.commentContent.value;
        const userId = userProfile.id
        const response = await axios.post(`http://localhost:8080/authapi/insertchildcomment`,
            {
                userId,
                postId,
                parentCommentId,
                comment
            },
            {
                headers: { 'Authorization': `Bearer ${token}` },
            }
        );
        if (response.status === 200) {
            navigate(0);
        }
    }

    const toggleFormVisibility = (id) => {
        setVisibleForms((prevVisibleForms) => ({
            [id]: !prevVisibleForms[id]
        }));
    };

    if(!data) {
        return (
            <></>
        )
    }

    function createdDate(createDate) {
        const dateParts = createDate.split("T");
        const [date, time] = dateParts;
        return `${date}  ${time}`;
    }

    function generateChildComment(data) {
        
        if (!data || data.length === 0) {
            return <></>;
        }
        const commentsItems = data.map((item, i) => (
            <div key={i} className={styles.mg20}>
                <div className={`${styles.box}`}>
                    <div className={styles.commentInfo}>
                        <Link className={styles.username} to={`/user/${item.comment.username}`}>{item.comment.username}</Link>
                        <div className={styles.createdDate}>{createdDate(item.comment.createdDate)}</div>
                    </div>
                    <div>{item.comment.content}</div>
                    {loginStatus ? <div className={styles.childBtn} onClick={() => toggleFormVisibility(item.comment.commentId)}>
                        <i className={`bi bi-plus`}></i>
                    </div> : ''}
                </div>
                {visibleForms[item.comment.commentId] && (
                    <div className={`${styles.box} ${styles.mg20}`}>
                        <form onSubmit={(e) => handleFormSubmit(e, item.comment.commentId)} className={styles.childCommentForm}>
                            <textarea id="commentContent" className={styles.textarea} />
                            <button type='submit'>등록</button>
                        </form>
                    </div>
                )}
                <div>
                    {generateChildComment(item.childComments)}
                </div>
            </div>
        ));
        return commentsItems;
    }

    function generateComment(data) {
        if (!data || data.length === 0) {
            return <div className={styles.box}>댓글이 없습니다.</div>;
        }
        const commentsItems = data.map((item, i) => (
            <div key={i}>
                <div className={`${styles.box}`}>
                    <div className={styles.commentInfo}>
                        <Link className={styles.username} to={`/user/${item.comment.username}`}>{item.comment.username}</Link>
                        <div className={styles.createdDate}>{createdDate(item.comment.createdDate)}</div>
                    </div>
                    <div className={styles.content}>{item.comment.content}</div>
                    {loginStatus ? <div className={styles.childBtn} onClick={() => toggleFormVisibility(item.comment.commentId)}>
                        <i className={`bi bi-plus`}></i>
                    </div> : ''}
                </div>
                {visibleForms[item.comment.commentId] && (
                    <div className={`${styles.box} ${styles.mg20}`}>
                        <form onSubmit={(e) => handleFormSubmit(e, item.comment.commentId)} className={styles.childCommentForm}>
                            <textarea id="commentContent" className={styles.textarea} />
                            <button type='submit'>등록</button>
                        </form>
                    </div>
                )}
                <div>
                    {generateChildComment(item.childComments)}
                </div>
            </div>
        ));
        return commentsItems;
    }

    return (
        <div className={styles.container}>
            <div className={styles.comment} >
                {generateComment(data.result)}
            </div>
        </div>
    )
}

export default Comment;