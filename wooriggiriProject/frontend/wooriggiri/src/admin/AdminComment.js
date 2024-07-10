import React, { useEffect, useState } from "react";
import styles from './styles/adminDetail.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminComment() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [option, setOption] = useState('commentId');
    const [keyword, setKeyword] = useState('');
    const [commentId, setCommentId] = useState(null);
    const [content, setContent] = useState(null);
    const [boardname, setBoardname] = useState(null);
    const [postId, setPostId] = useState(null);
    const [username, setUsername] = useState(null);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.get('http://localhost:8080/authapi/admincomment', {
                params: {
                    id: commentId,
                    content: content,
                    username: username,
                    boardname: boardname,
                    postId: postId,
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
    }, [page, commentId, content, username, boardname, postId])

    function searchKeyword() {
        if(option=='commentId') {
            setCommentId(keyword)
            setPostId(null)
            setContent(null)
            setUsername(null)
            setBoardname(null)
            setPage(1)
        }
        if(option=='content') {
            setContent(keyword)
            setCommentId(null)
            setPostId(null)
            setUsername(null)
            setBoardname(null)
            setPage(1)
        }
        if(option=='username') {
            setUsername(keyword)
            setCommentId(null)
            setPostId(null)
            setContent(null)
            setBoardname(null)
            setPage(1)
        }
        if(option=='boardname') {
            setBoardname(keyword)
            setCommentId(null)
            setPostId(null)
            setContent(null)
            setUsername(null)
            setPage(1)
        }
        if(option=='postId') {
            setPostId(keyword)
            setCommentId(null)
            setContent(null)
            setUsername(null)
            setBoardname(null)
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
    function deleteComment(id) {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.post('http://localhost:8080/authapi/deletecomment', 
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
    function generateComments(comments) {
        return comments.map((comment, index) => (
            <tr key={index}>
                <td>{comment.commentId}</td>
                <td className={styles.nowrap}><Link to={`/community/${comment.boardname}/post/${comment.postId}`}>{comment.content}</Link></td>
                <td><Link to={`/community/${comment.boardname}`}>{comment.boardname}</Link></td>
                <td><Link to={`/community/${comment.boardname}/post/${comment.postId}`}>{comment.postId}</Link></td>
                <td><Link to={`/user/${comment.username}`}>{comment.username}</Link></td>
                <td className={styles.createdDate}>
                    {createdDate(comment.createdDate)}
                </td>
                <td><i className="bi bi-x" onClick={() => deleteComment(comment.commentId)}></i></td>
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
                <Link className={`${styles.btn}`} to={`/admin/post`}>
                    게시글
                </Link>
                <Link className={`${styles.btn} ${styles.select}`}>
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
                            <th>댓글번호</th>
                            <th>내용</th>
                            <th>게시판</th>
                            <th>게시글</th>
                            <th>작성자</th>
                            <th>작성일</th>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {generateComments(data.result)}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagingContainer}>
                { !(data.metadata.currentPage == 1) ? <i onClick={() => setPage(data.metadata.currentPage-1)} className={`${styles.prevBtn} bi bi-caret-left`}></i> : <div className={styles.prevBtn}></div> }
                <div className={styles.pagingBox}>
                    <select onChange={(e)=> setOption(e.target.value)}>
                        <option value='commentId'>댓글 번호</option>
                        <option value='content'>내용</option>
                        <option value='boardname'>게시판</option>
                        <option value='postId'>게시글</option>
                        <option value='username'>작성자</option>
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

export default AdminComment;