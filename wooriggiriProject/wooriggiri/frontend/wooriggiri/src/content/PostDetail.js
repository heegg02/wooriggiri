import React, { useState, useEffect } from 'react';
import styles from './styles/postDetail.module.css'
import {useParams} from 'react-router-dom';
import axios from 'axios';

import Comment from './components/Comment.js'

function PostDetail() {
    const postId = useParams().postId;
    const [data, setData] = useState(null);

    useEffect(() => {
            const fetch = async () => {
                const response = await axios.get(`http://localhost:8080/api/postdetail?postId=${postId}`);
                if (response.status === 200) {
                    console.log(response.data)
                    setData(response.data);
                }
            };
            fetch();
    }, [])

    if(!data) {
        return <></>;
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
                        <div className={styles.username}>
                            {data.result[0].username}
                        </div>
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
                <Comment postId={data.result[0].postId}/>
            </div>
        </div>
    );
}

export default PostDetail;
