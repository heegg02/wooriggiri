import React, { useState, useEffect } from 'react';
import styles from './styles/postDetail.module.css'
import {useParams} from 'react-router-dom';
import axios from 'axios';


function PostDetail() {
    const postId = useParams().postId;
    const [data, setData] = useState(null);

    useEffect(() => {
        // const fetch = async () => {
        //     const response = await axios.get(`http://localhost:8080/api/postdetail?postId=${postId}`);
        //     if (response.status === 200) {
        //         console.log(response.data)
        //         setData(response.data);
        //     }
        // };
        // fetch();
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <div className={styles.header}>
                    <div className={styles.postId}>
                        {postId}
                    </div>
                    <div className={styles.title}>
                        title
                    </div>
                    <div className={styles.postInfo}>
                        <div className={styles.viewCount}>
                            viewCount
                        </div>
                        <div className={styles.username}>
                            username
                        </div>
                        <div className={styles.createdDate}>
                            createdDate
                        </div>
                    </div>
                </div>
                <div className={styles.postContent}>
                    postContent
                </div>
                <div className={styles.comment}>
                    <div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostDetail;
