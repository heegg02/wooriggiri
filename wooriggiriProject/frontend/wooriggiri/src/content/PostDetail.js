import React, { useState, useEffect } from 'react';
import styles from './styles/postDetail.module.css'
import {useParams, useNavigate, Link} from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext.js';
import Comment from './components/Comment.js'

function PostDetail() {
    const navigate = useNavigate();
    const { loginStatus, userProfile } = useAuth();
    const postId = useParams().postId;
    const [data, setData] = useState(null);
    const [comment, setComment] = useState(null);

    useEffect(() => {
            const fetch = async () => {
                const response = await axios.get(`http://localhost:8080/api/postdetail?postId=${postId}`);
                if (response.status === 200) {
                    setData(response.data);
                }
            };
            fetch();
    }, [])

    if(!data) {
        return <></>;
    }
    function InsertComment() {
        const token = localStorage.getItem('accessToken');
        const userId = userProfile.id
        const fetch = async () => {
            const response = await axios.post(`http://localhost:8080/authapi/insertcomment`,
                {
                    userId,
                    postId,
                    comment
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
            <div className={styles.box}>
                <div className={styles.header}>
                    <div className={styles.postId}>
                        {data.result[0].postId}.
                    </div>
                    <div className={styles.title}>
                        {data.result[0].title}
                    </div>
                    <div className={styles.postInfo}>
                        <div className={styles.viewCount}>
                            {data.result[0].viewCount}
                        </div>
                        <Link to={`/user/${data.result[0].username}`} className={styles.username}>
                            {data.result[0].username}
                        </Link>
                        <div className={styles.createdDate}>
                            {data.result[0].createdDate}
                        </div>
                        <div className={styles.updateDate}>
                            {data.result[0].updateDate}
                        </div>
                    </div>
                </div>
                <div className={styles.postContent}>
                    {data.result[0].content}
                </div>
                {loginStatus ? <div className={styles.commentInput}>
                    <div>
                        댓글
                    </div>
                    <textarea 
                        className={styles.textarea}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button onClick={() => InsertComment()}>등록</button>
                </div> : ''}
                <Comment postId={data.result[0].postId}/>
            </div>
        </div>
    );
}

export default PostDetail;
