import React from 'react';
import styles from './styles/postRow.module.css'
import { Link } from 'react-router-dom';

function PostRow( props ) {
    const post = props.post;

    function createdDate(createDate) {
        const dateParts = createDate.split("T");
        const [date, time] = dateParts;
        return `${date}  ${time}`;
    }

    return(
        <div className={`${styles.box} ${styles.ac_c}`}>
            <div className={`${styles.id} ${styles.ac_c}`}>
                {post.id}
            </div>
            <div className={`${styles.title} ${styles.ac_c}`}>
                {post.title}
            </div>
            <div className={styles.postInfo}>
                <div className={`${styles.viewCount} ${styles.ac_c}`}>
                    {post.viewCount}
                </div>
                <div className={`${styles.username} ${styles.ac_c}`}>
                    {post.username}
                </div>
                <div className={`${styles.createdDate} ${styles.ac_c}`}>
                    {createdDate(post.createdDate)}
                </div>
            </div>
        </div>
    );
} 

export default PostRow;