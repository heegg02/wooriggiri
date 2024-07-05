import React, { useEffect, useState } from 'react';
import styles from './styles/comment.module.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Comment({postId}) {
    const [data , setData] = useState(null)
    
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

    function generateList(data) {
        if(data && data.length > 0) {
            const commentsItems = []
            for (let i=0; i<data.length; i++) {
                console.log(data[i])
                commentsItems.push(
                    <div key={i} className={`${styles.box} ${styles.mg_{}}`}>
                        <div className={styles.commentInfo}>
                            <Link className={styles.username} to={`/user/${data[i].comment.username}`}>{data[i].comment.username}</Link>
                            <div className={styles.createdDate}>{createdDate(data[i].comment.createdDate)}</div>
                        </div>
                        <div>{data[i].comment.content}</div>
                    </div>
                )
            }
            return commentsItems;
        } else {
            return <></>;
        }

    }

    return (
        <div className={styles.container}>
            <div>댓글</div>
            <div className={styles.comment} >
                {generateList(data.result)}
            </div>
        </div>
    )
}

export default Comment;