import React, { useState, useEffect } from "react";
import styles from './styles/sidebarContent.module.css';
import { useAuth } from '../contexts/AuthContext.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

function SidebarContent({ openModal }) {    
    const { userProfile } = useAuth();
    const [myCommunityList, setMyCommunityList] = useState([]);
    const [favoriteCommunities, setFavoriteCommunities] = useState([]);

    useEffect(() => {
        const fetchCommunityLists = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/communitylist?userId=${userProfile.id}`);
                if (response.status === 200) {
                    setMyCommunityList(response.data.myCommunityList || []);
                    setFavoriteCommunities(response.data.favoriteCommunities || []);
                }
            } catch (error) {
                console.error('Error fetching community lists', error);
            }
        };

        fetchCommunityLists();
    }, [userProfile]);

    const generateList = (lists) => (
        lists.map((community, index) => (
            <Link key={index} className={styles.content} to={`/community/${community}`}>
                {community} 게시판
            </Link>
        ))
    );

    return (
        <div className={styles.container}>
            {userProfile.userType== 2 ? <div className={styles.list}>
                <div className={styles.title}>
                    관리자
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        <Link className={styles.content} to={`/admin/user`}>
                            유저 관리
                        </Link>
                        <Link className={styles.content} to={`/admin/board`}>
                            게시판 관리
                        </Link>
                        <Link className={styles.content} to={`/admin/post`}>
                            게시글 관리
                        </Link>
                        <Link className={styles.content} to={`/admin/comment`}>
                            댓글 관리
                        </Link>
                        <Link className={styles.content} to={`/admin/noties`}>
                            공지 등록
                        </Link>
                    </div>
                </div>
            </div> : ''}
            <div className={styles.list}>
                <div className={styles.title}>
                    <div>내가 만든 게시판</div>
                    <div className={styles.btnContainer}>
                        <i onClick={openModal} className="bi bi-plus" />
                    </div>
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        {myCommunityList.length > 0 
                            ? generateList(myCommunityList)
                            : <div className={styles.content}>새로운 게시판 생성</div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.list}>
                <div className={styles.title}>
                    즐겨찾는 게시판
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        {favoriteCommunities.length > 0 
                            ? generateList(favoriteCommunities)
                            : <div className={styles.content}>아직 즐겨찾는 게시판이 없습니다.</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SidebarContent;
