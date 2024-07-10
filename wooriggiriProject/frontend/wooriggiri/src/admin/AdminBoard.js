import React, { useEffect, useState } from "react";
import styles from './styles/adminDetail.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminBoard() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [option, setOption] = useState('id');
    const [keyword, setKeyword] = useState('');
    const [id, setId] = useState(null);
    const [boardname, setBoardname] = useState(null);
    const [username, setUsername] = useState(null);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.get('http://localhost:8080/authapi/adminboard', {
                params: {
                    id: id,
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
    }, [page, id, boardname, username])

    function searchKeyword() {
        if(option=='id') {
            setId(keyword)
            setBoardname(null)
            setUsername(null)
            setPage(1)
        }
        if(option=='이름') {
            setBoardname(keyword)
            setId(null)
            setUsername(null)
            setPage(1)
        }
        if(option=='만든이') {
            setUsername(keyword)
            setId(null)
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
    function generateBoards(boards) {
        return boards.map((board, index) => (
            <tr key={index}>
                <td>{board.boardId}</td>
                <td><Link to={`/community/${board.boardname}`}>{board.boardname}</Link></td>
                <td>{board.description}</td>
                <td><Link to={`/user/${board.username}`}>{board.username}</Link></td>
                <td className={styles.createdDate}>
                    {createdDate(board.createdDate)}
                </td>
                <td><i className="bi bi-x" onClick={() => deleteBoard(board.boardId)}></i></td>
            </tr>
        ));
    }

    return (
        <>
            <div className={styles.btncontainer}>
                <Link className={`${styles.btn}`} to={`/admin/user`}>
                    유저
                </Link>
                <Link className={`${styles.btn} ${styles.select}`}>
                    게시판
                </Link>
                <Link className={`${styles.btn}`} to={`/admin/post`}>
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
                            <th>게시판 Id</th>
                            <th>게시판 이름</th>
                            <th>설명</th>
                            <th>만든이</th>
                            <th>작성일</th>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {generateBoards(data.result)}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagingContainer}>
                { !(data.metadata.currentPage == 1) ? <i onClick={() => setPage(data.metadata.currentPage-1)} className={`${styles.prevBtn} bi bi-caret-left`}></i> : <div className={styles.prevBtn}></div> }
                <div className={styles.pagingBox}>
                    <select onChange={(e)=> setOption(e.target.value)}>
                        <option value='id'>게시판 Id</option>
                        <option value='이름'>게시판 이름</option>
                        <option value='만든이'>만든이</option>
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

export default AdminBoard;