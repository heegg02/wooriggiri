import React, { useEffect, useState } from "react";
import styles from './styles/adminDetail.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Modal from '../components/Modal.js'
import CreateNoties from "./CreateNoties.js";

function AdminNoties() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [option, setOption] = useState('postId');
    const [keyword, setKeyword] = useState('');
    const [postId, setPostId] = useState(null);
    const [title, setTitle] = useState(null);
    const [data, setData] = useState(null);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    const openModal = () => {
        setIsModalOpen(true);
    };
  
    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.get('http://localhost:8080/authapi/adminnoties', {
                params: {
                    id: postId,
                    title: title,
                    page: page
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                console.log(response.data);
                setData(response.data);
            }
        }
        fetch();
    }, [page, postId, title])

    function searchKeyword() {
        if(option=='postId') {
            setPostId(keyword)
            setTitle(null)
            setPage(1)
        }
        if(option=='title') {
            setTitle(keyword)
            setPostId(null)
            setPage(1)
        }
    }

    if(!data) {
        return null;
    }

    function createdDate(createDate) {
        const dateParts = createDate.split("T");
        const [date, time] = dateParts;
        return `${date} ${time}`;
    }
    function deletePost(id) {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.post('http://localhost:8080/authapi/deletepost', 
                {
                    id
                },
                {
                    headers: { 'Authorization': `Bearer ${token}` },
                }
            );
            if (response.status === 200) {
                navigate(0);
            }
        };
        fetch();
    }
    function generatePosts(posts) {
        return posts.map((post, index) => (
            <tr key={index}>
                <td>{post.postId}</td>
                <td>{post.title}</td>
                <td className={styles.createdDate}>
                    {createdDate(post.createdDate)}
                </td>
                <td><i className="bi bi-x" onClick={() => deletePost(post.postId)}></i></td>
            </tr>
        ));
    }

    return (
        <>
            <div className={styles.btncontainer}>
                <Link className={`${styles.btn}`} to={`/admin/user`}>
                    유저
                </Link>
                <Link className={`${styles.btn}`} to={`/admin/board`}>
                    게시판
                </Link>
                <Link className={`${styles.btn}`} to={`/admin/post`} >
                    게시글
                </Link>
                <Link className={`${styles.btn}`} to={`/admin/comment`}>
                    댓글
                </Link>
                <Link className={`${styles.btn} ${styles.noties} ${styles.select}`}>
                    공지
                </Link>
                <div className={`${styles.btn} ${styles.write}`} onClick={() => openModal()}>
                    공지 작성
                </div>
            </div>
            <div className={`${styles.content} ${styles.box}`}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>제목</th>
                            <th>작성일</th>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {generatePosts(data.result)}
                    </tbody>
                </table>
                <Modal title={`공지 게시글`} isOpen={isModalOpen} onClose={closeModal}><CreateNoties/></Modal>
            </div>
            <div className={styles.pagingContainer}>
                { !(data.metadata.currentPage == 1) ? <i onClick={() => setPage(data.metadata.currentPage-1)} className={`${styles.prevBtn} bi bi-caret-left`}></i> : <div className={styles.prevBtn}></div> }
                <div className={styles.pagingBox}>
                    <select onChange={(e)=> setOption(e.target.value)}>
                        <option value='postId'>게시글 번호</option>
                        <option value='title'>제목</option>
                    </select>
                    <input
                        id="searchInput"
                        className={styles.input}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                    <i onClick={() => searchKeyword()} className={`${styles.searchBtn} ${styles.searchIcon} bi bi-search`}/>
                </div>
                { !(data.metadata.currentPage == data.metadata.pageLength) ? <i onClick={() => setPage(data.metadata.currentPage+1)} className={`${styles.nextBtn} bi bi-caret-right`}></i> : <div className={styles.nextBtn}></div> }
            </div>
        </>
    )
}

export default AdminNoties;