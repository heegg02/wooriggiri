import React, { useState, useEffect } from "react";
import styles from './styles/sidebarContent.module.css'
import { useAuth } from '../contexts/AuthContext.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SidebarContent() {    
    const { userProfile } = useAuth();
    const [ myCommunityList, setMyCommunityList ] = useState(null);
    const [ favoriteCommunities, setFavoriteCommunities ] = useState(null);

    useEffect(() => {
        const fetchMyCommunityList = async () => {
            const response = await axios.get(`http://localhost:8080/api/communitylist?userId=${userProfile.id}`);
            if (response.status === 200) {
                setMyCommunityList(response.data.myCommunityList);
                setFavoriteCommunities(response.data.favoriteCommunities);
            } else {
                setMyCommunityList(response.data.myCommunityList);
                setFavoriteCommunities(response.data.favoriteCommunities);
            }
        };
        fetchMyCommunityList();
    }, [])

    function generateList(Lists) {
        const listItems = [];

        for (let i = 0; i < Lists.length; i++) {
            listItems.push(
                <Link key={i} className={`${styles.content}`} to={`/community/${Lists[i]}`}>
                    {Lists[i]} 게시판
                </Link>
            );
        }

        return listItems
    }

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <div className={`${styles.title}`}>
                    {userProfile.username}'s 페이지
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        <Link className={`${styles.content}`} to={`/user/${userProfile.username}`}>
                            페이지 바로가기
                        </Link>
                        <Link className={`${styles.content}`} to={`/user/${userProfile.username}`}>
                            글 작성
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.list}>
                <div className={`${styles.title}`}>
                    내가 만든 게시판
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        { myCommunityList && myCommunityList.length > 0 ?
                            generateList(myCommunityList) : 
                            <div className={`${styles.content}`}>새로운 게시판 생성</div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.list}>
                <div className={`${styles.item} ${styles.title}`}>
                    즐겨찾는 게시판
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        { favoriteCommunities && favoriteCommunities.length > 0 ?
                            generateList(favoriteCommunities) : 
                            <div className={`${styles.content}`}>아직 즐겨찾는 게시판이 없습니다.</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarContent;