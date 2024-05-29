import React from 'react';
import { useParams } from 'react-router-dom';

function Community() {
    const communityName = useParams().communityName;
    
    return (
        <div className="Community">
            <h1>
                { communityName }의 Community 페이지 입니다.
            </h1>
        </div>
    );
} 

export default Community;