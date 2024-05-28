import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

function CreatePost() {
    const location = useLocation();
    const { postId, communityName, userName } = useParams();

    if (location.pathname.startsWith('/community/')) {
        return (
            <h1>{communityName}의 {postId}게시글 작성 페이지 입니다.</h1>
        );
    }
    if (location.pathname.startsWith('/user/')) {
        return (
            <h1>{userName}의 {postId}게시글 작성 페이지 입니다.</h1>
        );
    }

    return (
        <h1>게시글 작성 페이지 입니다.</h1>
    ); // 모든 조건에 해당하지 않을 때
}

export default CreatePost;
