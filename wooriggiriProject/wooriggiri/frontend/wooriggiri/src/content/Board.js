import React, { useEffect, useState, useRef } from 'react';
import styles from './styles/board.module.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import { Link } from 'react-router-dom';
import axios from 'axios';

import PostRow from './components/PostRow.js';

function Community() {
    const { loginStatus, userProfile } = useAuth();
    const communityName = useParams().communityName;
    const [page, setPage] = useState(1);
    const [isWide, setIsWide] = useState(null);
    const [data, setData] = useState(null);

    const containerRef = useRef(null);

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(`http://localhost:8080/api/communityposts?communityname=${communityName}&page=${page}`);
            if (response.status === 200) {
                console.log(response.data)
                setData(response.data);
            }
        };
        fetch();
    }, [])

    useEffect(() => {
        const container = containerRef.current;
        const handleResize = () => {
            if (container) {
                setIsWide(container.offsetWidth >= 950);
            }
        };

        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);
        if (container) {
            resizeObserver.observe(container);
        }

        return () => {
            if (container) {
                resizeObserver.unobserve(container);
            }
        };
    }, []);

    function createdDate(createDate) {
        const dateParts = createDate.split("T");
        const [date, time] = dateParts;
        return `${date}  ${time}`;
    }

    if (!data) {
        return <div ref={containerRef}>Loading...</div>;
    }


    function generateList(Lists) {
        if(Lists && Lists.length > 0) {
            const listItems = [];
            for (let i = 0; i < Lists.length; i++) {
                console.log(i);
                listItems.push(
                    <PostRow key={i} post={Lists[i]}/>
                );
            }
            return listItems
        }
    }

    return (
        <div ref={containerRef} className={`${styles.container} ${isWide ? styles.grid : styles.flex}`}>
            <div className={`${styles.order2}`}>
                <div className={`${styles.header} ${styles.box}`}>
                    <div className={styles.communityName}>
                        {data.metadata.boardname} 게시판<i className={`${styles.favoritBtn} bi bi-star`}></i>
                    </div>
                    <div className={styles.communityDescription}>
                        {data.metadata.description}
                    </div>
                    <div className={styles.communityInfo}>
                        <div>
                            {data.metadata.username}
                        </div>
                        <div>
                            {createdDate(data.metadata.createdDate)}
                        </div>
                        <div>
                            {data.metadata.updatedDate}
                        </div>
                    </div>
                    <div className={`${styles.flexMenu}`}>
                        <i className={`${styles.writePost} bi bi-pencil-square`}/>
                        {/* {postsMetadata.userId == userProfile.id ? <i className={`${styles.communitySetting} bi bi-wrench`}/> : ''} */}
                    </div>                
                </div>
                <div className={`${styles.gridMenu}`}>
                    <i className={`${styles.writePost} bi bi-pencil-square`}/>
                    {/* {postsMetadata.userId == userProfile.id ? <i className={`${styles.communitySetting} bi bi-wrench`}/> : ''} */}
                </div>
            </div>
            <div className={`${styles.boardContainer}`}>
                <div className={`${styles.board} ${styles.box}`}>
                    {generateList(data.result)}
                </div>
            </div>
        </div>
    );
} 

export default Community;