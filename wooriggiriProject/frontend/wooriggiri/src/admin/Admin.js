import React, { useEffect, useState } from "react";
import styles from './styles/admin.module.css';
import Modal from '../components/Modal.js';
import { useAuth } from '../contexts/AuthContext.js';
import { useNavigate } from 'react-router-dom';

function Admin({ children }) {
    const navigate = useNavigate();
    const { loginstatus, userProfile } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (loginstatus !== null && userProfile) {
            if (userProfile.userType !== 2) {
                setIsModalOpen(true);
            }
        }
    }, [loginstatus, userProfile]);

    const closeModal = () => {
        navigate('/');
    };

    if (loginstatus === null || !userProfile) {
        return null; // Optionally, render a loading spinner or some placeholder content
    }

    return (
        <div className={styles.container}>
            {userProfile.userType === 2 ? (
                <>
                    <div className={`${styles.header} ${styles.box}`}>
                        <div>관리자 페이지</div>
                    </div>
                    {children}
                </>
            ) : (
                <Modal title="접근 권한이 없습니다." isOpen={isModalOpen} onClose={closeModal}></Modal>
            )}
        </div>
    );
}

export default Admin;
