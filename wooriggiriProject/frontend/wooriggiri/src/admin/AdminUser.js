import React, { useEffect, useState } from "react";
import styles from './styles/adminDetail.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminUser() {
    const navigate = useNavigate();
    const [page, setPage] = useState(1);
    const [option, setOption] = useState('userId');
    const [keyword, setKeyword] = useState('');
    const [id, setId] = useState(null);
    const [username, setUsername] = useState(null);
    const [data, setData] = useState(null);
    
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.get('http://localhost:8080/authapi/adminuser', {
                params: {
                    id: id,
                    username: username
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
    }, [page, id, username])

    function searchKeyword() {
        if(option=='userId') {
            setId(keyword)
            setUsername(null)
            setPage(1)
        }
        if(option=='username') {
            setUsername(keyword)
            setId(null)
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

    function deleteUser(id) {
        const token = localStorage.getItem('accessToken');
        const fetch = async () => {
            const response = await axios.post('http://localhost:8080/authapi/deleteuser', 
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

    function generateUsers(users) {
        return users.map((user, index) => (
            <tr key={index}>
                <td>{user.userId}</td>
                <td><Link to={`/user/${user.username}`}>{user.username}</Link></td>
                <td className={styles.createdDate}>
                    {createdDate(user.createdDate)}
                </td>
                <td><i className="bi bi-x" onClick={() => deleteUser(user.userId)}></i></td>
            </tr>
        ));
    }

    return (
        <>
            <div className={styles.btncontainer}>
                <Link className={`${styles.btn} ${styles.select}`}>
                    유저
                </Link>
                <Link className={`${styles.btn}`} to={`/admin/board`}>
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
                            <th>회원 번호</th>
                            <th>회원 이름</th>
                            <th>생성일</th>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {generateUsers(data.result)}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagingContainer}>
                { !(data.metadata.currentPage == 1) ? <i onClick={() => setPage(data.metadata.currentPage-1)} className={`${styles.prevBtn} bi bi-caret-left`}></i> : <div className={styles.prevBtn}></div> }
                <div className={styles.pagingBox}>
                    <select onChange={(e)=> setOption(e.target.value)}>
                        <option value='userId'>회원 번호</option>
                        <option value='username'>회원 이름</option>
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