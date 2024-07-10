import React, { useEffect, useState, useRef } from 'react';
import styles from './styles/board.module.css';
import axios from 'axios';

import PostRow from './components/PostRow.js';

import BoardPagingBtn from './components/BoardPagingBtn.js'

function NotiesBoard() {
    const [page, setPage] = useState(1);
    const [isWide, setIsWide] = useState(null);
    const [data, setData] = useState(null);
    const [ title, setTitle ] = useState(null)
    const [ username, setUsername ] = useState(null)
    
    const containerRef = useRef(null);
    useEffect(() => {
        const fetchCommunityData = async () => {
            const response = await axios.get(`http://localhost:8080/api/noties`,{
                params: {
                    page: page,
                    title: title,
                    username: username
                }
            });
            if (response.status === 200) {
                console.log(response.data);
                setData(response.data);
            }
        };
        fetchCommunityData();
    }, [ page, title, username ]);

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

    if (!data) {
        return <div ref={containerRef}>Loading...</div>;
    }

    return (
        <div ref={containerRef} className={`${styles.container} ${isWide ? styles.grid : styles.flex}`}>
            <div className={`${styles.order2}`}>
                <div className={`${styles.header} ${styles.box}`}>
                    <div className={styles.communityName}>
                        공지 게시판 
                    </div>
                    <div className={styles.communityDescription}>
                        {data.metadata.description}
                    </div>
                    <div className={styles.communityInfo}>
                        <div>
                            {data.metadata.username}
                        </div>
                        <div>
                            {data.metadata.createdDate}
                        </div>
                        <div>
                            {data.metadata.updatedDate}
                        </div>
                    </div>            
                </div>
            </div> 
            <div className={`${styles.boardContainer}`}>
                {data == null || data.result.length === 0 ? <div className={`${styles.nullData} ${styles.box}`}>게시글이 없습니다.</div> :<PostRow post={data} />}
                <BoardPagingBtn
                    setPage={setPage}
                    setTitle={setTitle}
                    setUsername={setUsername}
                    metadata={data.metadata} />
            </div>
        </div>
    );
}

export default NotiesBoard;
