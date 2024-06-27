import React, { useState, useEffect } from "react";
import styles from './styles/sidebarContent.module.css'
import { useAuth } from '../contexts/AuthContext.js';
import axios from 'axios';

function SidebarContent() {    
    const { userProfile } = useAuth();
    const [ communityList, setCommunityList ] = useState(null);
    useEffect(() => {
        const fetchMyCommunityList = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/mycommunitylist?userId=${userProfile.id}`);
                if (response.status === 200) {
                    setCommunityList(response.data);
                } else {
                }
            } catch (error) {
            }
        };
        fetchMyCommunityList();
    }, [])
    
    function generateList(Lists) {
        const listItems = [];

        for (let i = 0; i < Lists.length; i++) {
            listItems.push(<div key={i} className={`${styles.Content}`}>{Lists[i]}</div>);
        }

        return listItems
    }

    return (
        <div className={styles.container}>
            <div className={styles.list}>
                <div className={`${styles.title}`}>
                    내 게시판
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        <div className={`${styles.Content}`}>
                            게시판 바로가기
                        </div>
                        <div className={`${styles.Content}`}>
                            글 작성
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.list}>
                <div className={`${styles.title}`}>
                    내 커뮤니티
                </div>
                <div className={styles.box}>
                    <div className={styles.item}>
                        { communityList ?
                            generateList(communityList) : 
                            <div className={`${styles.Content}`}>커뮤니티 만들기</div>
                        }
                    </div>
                </div>
            </div>
            <div className={styles.list}>
                <div className={`${styles.item} ${styles.title}`}>
                    즐겨찾는 커뮤니티
                </div>
            </div>
        </div>
    );
}

export default SidebarContent;