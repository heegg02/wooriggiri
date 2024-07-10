import React, { useEffect, useState } from 'react';
import styles from './styles/userDetail.module.css';
import { Link, useParams, useNavigate } from 'react-router-dom';

import axios from 'axios';

import { useAuth } from '../contexts/AuthContext.js';

function UserDetail() {
    const navigate = useNavigate();
    const [selectType, setSelectType] = useState('post');
    const [data, setData] = useState(null);
    const username = useParams().userId;
    const { loginStatus, userProfile } = useAuth();

    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get('http://localhost:8080/api/userdetail', {
                params: { username }
            });
            if (response.status === 200) {
                console.log(response.data);
                setData(response.data);
            }
        };
        if(loginStatus != null) {
            fetch();
        }
    }, [username, loginStatus]);

    if (!data) {
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

    function deleteBoard(id) {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.post('http://localhost:8080/authapi/deleteboard', 
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

    function favoritBtn(userId, boardId) {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.post(`http://localhost:8080/authapi/favoriteboard`, {
                userId: userId,
                boardId: boardId,
                favorite: true
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.status === 200) {
                navigate(0);
            }
        };
        fetch();
    };

    function generatePosts(posts) {
        return posts.map((post, index) => (
            <tr key={index}>
                <td>{post.id}</td>
                <td className={styles.nowrap}>
                    <Link to={`/community/${post.boardname}/post/${post.id}`}>{post.title}</Link>
                </td>
                <td>{post.viewCount}</td>
                <td className={styles.nowrap}>
                    <Link to={`/community/${post.boardname}`}>{post.boardname}</Link>
                </td>
                <td className={styles.createdDate}>
                    {createdDate(post.createdDate)}
                </td>
                {loginStatus && data.metadata.userId === userProfile.id && 
                <td>
                    <i className="bi bi-x" onClick={() => deletePost(post.id)}></i>
                </td>}
            </tr>
        ));
    }

    function generateComments(comments) {
        return comments.map((comment, index) => (
            <tr key={index}>
                <td>{comment.commentId}</td>
                <td className={styles.nowrap}>{comment.content}</td>
                <td>{comment.postId}</td>
                <td className={styles.nowrap}>{comment.boardname}</td>
                <td className={styles.createdDate}>
                    {createdDate(comment.createdDate)}
                </td>
                {loginStatus && data.metadata.userId === userProfile.id && 
                <td>
                    <i className="bi bi-x" onClick={() => deleteComment(comment.commentId)}></i>
                </td>}
            </tr>
        ));
    }

    function generateMyBoards(myBoards) {
        return myBoards.map((board, index) => (
            <tr key={index}>
                <td className={styles.nowrap}>{board.boardname}</td>
                <td className={styles.nowrap}>{board.description}</td>
                <td className={styles.nowrap}>{board.username}</td>
                <td className={styles.createdDate}>
                    {createdDate(board.createdDate)}
                </td>
                {loginStatus && data.metadata.userId === userProfile.id && 
                <td>
                    <i className="bi bi-x" onClick={() => deleteBoard(board.boardId)}></i>
                </td>}
            </tr>
        ));
    }

    function generateFavoriteBoards(favoriteBoards) {
        return favoriteBoards.map((board, index) => (
            <tr key={index}>
                <td>{board.boardname}</td>
                <td>{board.description}</td>
                <td>{board.username}</td>
                <td className={styles.createdDate}>
                    {createdDate(board.createdDate)}
                </td>
                {loginStatus && data.metadata.userId === userProfile.id && 
                <td>
                    <i className="bi bi-x" onClick={() => favoritBtn(userProfile.id, board.boardId)}></i>
                </td>}
            </tr>
        ));
    }

    return (
        <div className={styles.container}>
            <div className={`${styles.header} ${styles.box}`}>
                <div>{username} 님의 유저 페이지입니다.</div>
            </div>
            <div className={styles.btncontainer}>
                <div className={`${styles.postBtn} ${selectType === 'post' ? styles.select : ''}`} onClick={() => setSelectType('post')}>
                    게시글
                </div>
                <div className={`${styles.commentBtn} ${selectType === 'comment' ? styles.select : ''}`} onClick={() => setSelectType('comment')}>
                    댓글
                </div>
                <div className={`${styles.myBoardBtn} ${selectType === 'myBoard' ? styles.select : ''}`} onClick={() => setSelectType('myBoard')}>
                    {username} 님이 만든 게시판
                </div>
                <div className={`${styles.favoriteBoardBtn} ${selectType === 'favoriteBoard' ? styles.select : ''}`} onClick={() => setSelectType('favoriteBoard')}>
                    즐겨찾는 게시판
                </div>
            </div>
            <div className={`${styles.content} ${styles.box}`}>
                {selectType === 'post' &&
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>글번호</th>
                                <th>제목</th>
                                <th>조회수</th>
                                <th>게시판</th>
                                <th>작성일</th>
                                {loginStatus && data.metadata.userId === userProfile.id && <td></td>}
                            </tr>
                        </thead>
                        <tbody>
                            {generatePosts(data.result.posts)}
                        </tbody>
                    </table>
                }
                {selectType === 'comment' &&
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>댓글번호</th>
                                <th>내용</th>
                                <th>게시글</th>
                                <th>게시판</th>
                                <th>작성일</th>
                                {loginStatus && data.metadata.userId === userProfile.id && <td></td>}
                            </tr>
                        </thead>
                        <tbody>
                            {generateComments(data.result.comments)}
                        </tbody>
                    </table>
                }
                {selectType === 'myBoard' &&
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>게시판 이름</th>
                                <th>설명</th>
                                <th>게시판 주인</th>
                                <th>작성일</th>
                                {loginStatus && data.metadata.userId === userProfile.id && <td></td>}
                            </tr>
                        </thead>
                        <tbody>
                            {generateMyBoards(data.result.myBoards)}
                        </tbody>
                    </table>
                }
                {selectType === 'favoriteBoard' &&
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>게시판 이름</th>
                                <th>설명</th>
                                <th>게시판 주인</th>
                                <th>작성일</th>
                                {loginStatus && data.metadata.userId === userProfile.id && <td></td>}
                            </tr>
                        </thead>
                        <tbody>
                            {generateFavoriteBoards(data.result.favoriteBoard)}
                        </tbody>
                    </table>
                }
            </div>
        </div>
    );
}

export default UserDetail;
