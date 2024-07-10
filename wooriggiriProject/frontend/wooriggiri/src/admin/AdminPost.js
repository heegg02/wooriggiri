import React, { useEffect, useState } from "react";
import styles from './styles/adminDetail.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminUser() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [option, setOption] = useState('postId');
    const [keyword, setKeyword] = useState('');
    const [postId, setPostId] = useState(null);
    const [title, setTitle] = useState(null);
    const [boardname, setBoardname] = useState(null);
    const [username, setUsername] = useState(null);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.get('http://localhost:8080/authapi/adminpost', {
                params: {
                    id: postId,
                    title: title,
                    username: username,
                    boardname: boardname,
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
    }, [page, postId, title, boardname, username])

    function searchKeyword() {
        if(option=='postId') {
            setPostId(keyword)
            setTitle(null)
            setUsername(null)
            setBoardname(null)
            setPage(1)
        }
        if(option=='title') {
            setTitle(keyword)
            setPostId(null)
            setUsername(null)
            setBoardname(null)
            setPage(1)
        }
        if(option=='username') {
            setUsername(keyword)
            setTitle(null)
            setPostId(null)
            setBoardname(null)
            setPage(1)
        }
        if(option=='boardname') {
            setBoardname(keyword)
            setPostId(null)
            setTitle(null)
            setUsername(null)
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
                <td><Link to={`/community/${post.boardname}/post/${post.postId}`}>{post.title}</Link></td>
                <td>{post.viewCount}</td>
                <td><Link to={`/user/${post.username}`}>{post.username}</Link></td>
                <td><Link to={`/community/${post.boardname}`}>{post.boardname}</Link></td>
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
                <Link className={`${styles.btn} ${styles.select}`} >
                    게시글
                </Link>
                <Link className={`${styles.btn}`} to={`/admin/comment`}>
                    댓글
                </Link>
                <Link className={`${styles.btn} ${styles.noties}`} to={`/admin/noties`}>
                    공지
                </Link>
            </div>
            <div className={`${styles.content} ${styles.box}`}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>글번호</th>
                            <th>제목</th>
                            <th>조회수</th>
                            <th>작성자</th>
                            <th>게시판</th>
                            <th>작성일</th>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {generatePosts(data.result)}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagingContainer}>
                { !(data.metadata.currentPage == 1) ? <i onClick={() => setPage(data.metadata.currentPage-1)} className={`${styles.prevBtn} bi bi-caret-left`}></i> : <div className={styles.prevBtn}></div> }
                <div className={styles.pagingBox}>
                    <select onChange={(e)=> setOption(e.target.value)}>
                        <option value='postId'>게시글 번호</option>
                        <option value='title'>제목</option>
                        <option value='username'>작성자</option>
                        <option value='boardname'>게시판</option>
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

export default AdminUser;