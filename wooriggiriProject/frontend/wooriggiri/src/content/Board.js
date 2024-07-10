import React, { useEffect, useState, useRef } from 'react';
import styles from './styles/board.module.css';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import axios from 'axios';

import PostRow from './components/PostRow.js';
import Modal from '../components/Modal.js'
import CreatePost from './components/CreatePost.js';

import BoardPagingBtn from './components/BoardPagingBtn.js'
function Community() {
    const { loginStatus, userProfile } = useAuth();
    const communityName = useParams().communityName;
    const [page, setPage] = useState(1);
    const [isWide, setIsWide] = useState(null);
    const [data, setData] = useState(null);
    const [favorite, setFavorite] = useState(false);
    const [ title, setTitle ] = useState(null)
    const [ username, setUsername ] = useState(null)
    
    const containerRef = useRef(null);

    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
        setIsModalOpen(true);
    };
  
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const fetchCommunityData = async () => {
            const response = await axios.get(`http://localhost:8080/api/communityposts`,{
                params: {
                    boardname: communityName,
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
    }, [ communityName, page, title, username ]);

    useEffect(() => {
        const fetchFavoriteStatus = async () => {
            const token = localStorage.getItem('accessToken');
            const response = await axios.get(`http://localhost:8080/authapi/checkfavorite`,
                {
                    params: {
                        userId: userProfile.id,
                        boardId: data.metadata.boardId
                    },
                    headers: { 'Authorization': `Bearer ${token}` }
                }
            );
            if (response.status === 200) {
                setFavorite(response.data);
            }
        };

        if (userProfile && data) {
            fetchFavoriteStatus();
        }
    }, [userProfile, data]) 

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

    const favoritBtn = async () => {
        const token = localStorage.getItem('accessToken');
        const response = await axios.post(`http://localhost:8080/authapi/favoriteboard`, {
            userId: userProfile.id,
            boardId: data.metadata.boardId,
            favorite
        }, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.status === 200) {

            setFavorite(response.data);
        }
    };

    const createdDate = (createDate) => {
        const dateParts = createDate.split("T");
        const [date, time] = dateParts;
        return `${date} ${time}`;
    };

    return (
        <div ref={containerRef} className={`${styles.container} ${isWide ? styles.grid : styles.flex}`}>
            <div className={`${styles.order2}`}>
                <div className={`${styles.header} ${styles.box}`}>
                    <div className={styles.communityName}>
                        {data.metadata.boardname} 게시판 {loginStatus ? <i onClick={favoritBtn} className={`${styles.favoritBtn} bi ${favorite ? 'bi-star-fill' : 'bi-star'}`}></i> : ''}
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
                    {loginStatus && <div className={`${styles.flexMenu}`}>
                        <i onClick={openModal} className={`${styles.writePost} bi bi-pencil-square`} />
                    </div>  }              
                </div>
                {loginStatus && <div className={`${styles.gridMenu}`}>
                    <i onClick={openModal} className={`${styles.writePost} bi bi-pencil-square`} />
                </div>}
            </div> 
            <div className={`${styles.boardContainer}`}>
                {data == null || data.result.length === 0 ? <div className={`${styles.nullData} ${styles.box}`}>게시글이 없습니다.</div> :<PostRow post={data} />}
                <BoardPagingBtn
                    setPage={setPage}
                    setTitle={setTitle}
                    setUsername={setUsername}
                    metadata={data.metadata} />
            </div>
            <Modal title={`${data.metadata.boardname}: 게시글 생성`} isOpen={isModalOpen} onClose={closeModal}><CreatePost boardId={data.metadata.boardId} /></Modal>
        </div>
    );
}

export default Community;
