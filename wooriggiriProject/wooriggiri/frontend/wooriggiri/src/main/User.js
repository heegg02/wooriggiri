import React from 'react';
import { useParams } from 'react-router-dom';

function User() {
    const userName = useParams().userName;
    
    return (
        <h1>{ userName } 유저의 게시판 페이지 입니다.</h1>
    );
} 

export default User;