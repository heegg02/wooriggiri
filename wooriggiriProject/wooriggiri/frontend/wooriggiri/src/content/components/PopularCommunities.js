import React, { useEffect, useState } from 'react';
import styles from './styles/posts.module.css';
import { Link } from 'react-router-dom';

import axios from 'axios';

function PopularCommunities() {
    const [popularCommunities, setPopularCommunities] = useState(null);

    useEffect(() => {
        const fetchMyCommunityList = async () => {
        const response = await axios.get(`http://localhost:8080/api/popularcommunities`);
        if (response.status === 200) {
            console.log(response.data)
            setPopularCommunities(response.data.popularCommunities);
        }
        };
        fetchMyCommunityList();
    }, [])

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
                            <Link className={`${styles.link}`} to={`/community/${Lists[i].boardname}`}>
                                {Lists[i].boardname}
                            </Link>
                        </td>
                        <td>
                            <Link className={`${styles.link}`} to={`/user/${Lists[i].username}`}>
                                {Lists[i].username}
                            </Link>
                        </td>
                        <td>
                            {Lists[i].totalPostsCount}
                        </td>
                        <td>
                            {Lists[i].totalViewCount}
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
                        게시판
                    </th>
                    <th className={`${styles.width_11}`}>
                        관리자
                    </th>
                    <th className={`${styles.width_11}`}>
                        게시글 생성 수 
                    </th>
                    <th className={`${styles.width_11}`}>
                        총 조회수
                    </th>
                </tr>
            </thead>
            <tbody>
                {generateList(popularCommunities)}
            </tbody>
        </table>
    )
}
export default PopularCommunities;