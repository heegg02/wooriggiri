import React, { useEffect, useState } from 'react';
import styles from './styles/posts.module.css';
import { useAuth } from '../../contexts/AuthContext.js';
import { Link } from 'react-router-dom';

import axios from 'axios';

function MyCommunityPosts() {
    const { userProfile, logout } = useAuth();
    const [myCommunityPosts, setMyCommunityPosts] = useState(null);

    useEffect(() => {
        const fetchMyCommunityList = async () => {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`http://localhost:8080/authapi/mycommunitiesposts?userId=${userProfile.id}`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.status === 200) {
                console.log(response.data)
                setMyCommunityPosts(response.data.myCommunitiesPosts);
            } else {
                logout();
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
                {generateList(myCommunityPosts)}
            </tbody>
        </table>
    )
}
export default MyCommunityPosts;