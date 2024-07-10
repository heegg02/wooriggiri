import React, { useEffect, useState } from 'react';
import styles from './styles/posts.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PopularPosts() {
    const [popularPosts, setPopularPosts] = useState(null);

    useEffect(() => {
        const fetchMyCommunityList = async () => {
        const response = await axios.get(`http://localhost:8080/api/popularposts`);
        if (response.status === 200) {
            console.log(response.data)
            setPopularPosts(response.data.popularPosts);
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
                            {i+1}
                        </td>
                        <td>
                            {Lists[i].id}
                        </td>
                        <td>
                            <Link className={`${styles.link}`} to={`/community/${Lists[i].boardname}`}>
                                {Lists[i].boardname}
                            </Link>
                        </td>
                        <td className={`${styles.overflow}`}>
                            <Link className={`${styles.link}`} to={`/community/${Lists[i].boardname}/post/${Lists[i].id}`}>
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
                    <th className={`${styles.width_6}`}>
                        순위
                    </th>
                    <th className={`${styles.width_11}`}>
                        게시글 ID
                    </th>
                    <th className={`${styles.width_11}`}>
                        게시판
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
                {generateList(popularPosts)}
            </tbody>
        </table>
    )
}
export default PopularPosts;