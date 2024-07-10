import React, { useEffect, useState } from 'react';
import styles from './styles/postRow.module.css'
import { Link } from 'react-router-dom';


function PostRow( props ) {
    const posts = props.post.result;

    if (!posts) {
        return <></>;
    }

    function createdDate(createDate) {
        const dateParts = createDate.split("T");
        const [date, time] = dateParts;
        return `${date}  ${time}`;
    }
    
    function generateList(posts) {{
        const listItems = [];
        for (let i = 0; i < posts.length; i++) {
            listItems.push(
                <div key={i} className={`${styles.box} ${styles.postRow}`}>
                    <div className={`${styles.id} ${styles.ac_c}`}>
                        {posts[i].id}
                    </div>
                    <div className={`${styles.title} ${styles.ac_c}`}>
                        <Link to={`./post/${posts[i].id}`}>{posts[i].title}</Link>
                    </div>
                    <div className={styles.postInfo}>
                        <div className={`${styles.viewCount} ${styles.ac_c}`}>
                            {posts[i].viewCount}
                        </div>
                        <div className={`${styles.username} ${styles.ac_c}`}>
                            <Link to={`/user/${posts[i].username}`}>{posts[i].username}</Link>
                        </div>
                        <div className={`${styles.createdDate} ${styles.ac_c}`}>
                            {createdDate(posts[i].createdDate)}
                        </div>
                    </div>
                </div>
            );
        }
        return listItems
        }
    }

    return(
        <div className={`${styles.container} ${styles.ac_c}`}>
            <div className={`${styles.box}`}>
                <div className={`${styles.id} ${styles.ac_c}`}>
                    글번호
                </div>
                <div className={`${styles.title} ${styles.ac_c}`}>
                    제목
                </div>
                <div className={styles.postInfo}>
                    <div className={`${styles.viewCount} ${styles.ac_c}`}>
                        조회수
                    </div>
                    <div className={`${styles.username} ${styles.ac_c}`}>
                        작성자
                    </div>
                    <div className={`${styles.createdDate} ${styles.ac_c}`}>
                        작성일
                    </div>
                </div>
            </div>
            {generateList(posts)}
        </div>
    );
} 

export default PostRow;