import React, { useEffect, useState } from 'react';
import styles from './styles/posts.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function NotiesPosts() {
    const [noticePosts, setNoticePosts] = useState(null);

    useEffect(() => {
        const fetchMyCommunityList = async () => {
        const response = await axios.get(`http://localhost:8080/api/notiesposts`);
        if (response.status === 200) {
            console.log(response.data)
            setNoticePosts(response.data.noticePosts);
        }
        };
        fetchMyCommunityList();
    }, [])
    
    function createdDate(createDate) {
        const dateParts = createDate.split("T");
        const [date, time] = dateParts;
        return `${date}  ${time}`;
    }

    function generateList(Lists) {
        if(Lists && Lists.length > 0) {
            const listItems = [];
            for (let i = 0; i < Lists.length; i++) {
                listItems.push(
                    <tr key={i} className={styles.item}>
                        <td>
                            {Lists[i].id}
                        </td>
                        <td className={`${styles.overflow}`}>
                            <Link className={`${styles.link}`} to={`/noties/post/${Lists[i].id}`}>
                                {Lists[i].title}
                            </Link>
                        </td>
                        <td>
                            <Link className={`${styles.link}`} to={`/user/${Lists[i].username}`}>
                                {Lists[i].username}
                            </Link>
                        </td>
                        <td>
                            {Lists[i].viewCount}
                        </td>
                        <td className={`${styles.overflow}`}>
                            {createdDate(Lists[i].createdDate)}
                        </td>
                    </tr>
                );
            }
            return listItems
        }
    }

    return (
        <table className={styles.itemContainer}>
            <thead>
                <tr className={styles.item}>
                    <th className={`${styles.width_11}`}>
                        게시글 ID
                    </th>
                    <th>
                        제목
                    </th>
                    <th className={`${styles.width_11}`}>
                        작성자
                    </th>
                    <th className={`${styles.width_11}`}>
                        조회수
                    </th>
                    <th className={`${styles.width_21}`}>
                        작성일
                    </th>
                </tr>
            </thead>
            <tbody>
                {generateList(noticePosts)}
            </tbody>
        </table>
    )
}
export default NotiesPosts;