import React from 'react';
import styles from './styles/userDetail.module.css'
import {useParams} from 'react-router-dom';


function UserDetail() {
    const userId = useParams().userId;
    return (
        <div className={styles.container}>
            {userId}
        </div>
    );
}

export default UserDetail;
