import React, { useEffect, useState, useRef } from 'react';
import styles from './styles/main.module.css';
import NotiesPosts from './components/NotiesPosts.js';
import PopularPosts from './components/PopularPosts.js';
import PopularCommunities from './components/PopularCommunities.js';
import MyCommunityPosts from './components/MyCommunityPosts.js';
import FavoriteCommunityPosts from './components/FavoriteCommuityPosts.js'
import { useAuth } from '../contexts/AuthContext.js';
import wooriggiriLogo  from '../assets/Logo.png'

function Main() {
    const { loginStatus } = useAuth();
    const [isWide, setIsWide] = useState(true);
    const [notNull, setNotNull] = useState(false);

    useEffect(() => {
        if(!(loginStatus == null)) {
            setNotNull(true)
        }
    }, [loginStatus])

    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const handleResize = () => {
            if (container) {
                setIsWide(container.offsetWidth >= 950);
            }
        };

        handleResize();

        const resizeObserver = new ResizeObserver(handleResize);
        if (container) {
            resizeObserver.observe(container);
        }

        return () => {
            if (container) {
                resizeObserver.unobserve(container);
            }
        };
    }, []);

    function myOwnBox() {
        if(loginStatus) {
            return (
                <>
                    <div className={`${styles.box}`}>
                        <div className={styles.title}>
                            내가 만든 게시판의 게시글
                        </div>
                        <MyCommunityPosts/>
                    </div>
                    <div className={`${styles.box}`}>
                        <div className={styles.title}>
                            즐겨찾는 게시판의 게시글
                        </div>
                        <FavoriteCommunityPosts/>
                    </div>
                </>
            )
        }
    }

    return (
        <div ref={containerRef} className={`${styles.container} ${isWide ? styles.grid : styles.flex}`}>
            <div className={`${styles.box}`}>
                <div className={styles.title}>
                    전체 게시판 인기 순위
                </div>
                {notNull ? <PopularCommunities/> : ''}
            </div>
            <div className={`${styles.box}`}>
                <div className={styles.title}>
                    전체 게시글 인기 순위
                </div>
                {notNull ? <PopularPosts/> : ''}
            </div>
            {myOwnBox()}
            <div className={`${styles.box}`}>
                <div className={styles.title}>
                    공지
                </div>
                {notNull ? <NotiesPosts/> : ''}
            </div>
        </div>
    );
}

export default Main;
