import React from 'react';
import { useParams, useLocation } from 'react-router-dom';

function Post() {
    const location = useLocation();
    const { postId, communityName, userName } = useParams();

    if (location.pathname.startsWith('/community/')) {
        return (
            <h1>{communityName}의 {postId}게시글 페이지 입니다.</h1>
        );
    }
    if (location.pathname.startsWith('/user/')) {
        return (
            <h1>{userName} 유저 게시판의 {postId}게시글 페이지 입니다.</h1>
        );
    }

    return null;
}

export default Post;
