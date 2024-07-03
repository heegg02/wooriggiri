import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './styles/searchBox.module.css'

function SearchBox() {
    const [ showResults, setShowResults ] = useState(false);
    const [ communities, setCommunities ] = useState(null);
    const [ users, setUsers ] = useState(null);
    const resultsRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (resultsRef.current && !resultsRef.current.contains(event.target)) {
                setShowResults(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])
    
    const handleInputChange = () => {
        if (communities && users) {
            setShowResults(true)
        } else {
            setShowResults(false)
        }
    };

    const searchKeyword = async (e) => {
        const keyword = e.target.value;
        if(!(keyword==="")) {
            console.log(keyword)
            const response = await axios.get(`http://localhost:8080/api/search?keyword=${encodeURIComponent(keyword)}`)
            if (response.status === 200) {
                setShowResults(true);
                setCommunities(response.data.communities);
                setUsers(response.data.users);
            } else {
                console.error('Error:', response.status);
            }
        } else {
            setShowResults(false);
            setCommunities(null);
            setUsers(null);
        }
    } 
    
    function generateList(Lists) {
        if(Lists && Lists.length > 0) {
            const listItems = [];
            for (let i = 0; i < Lists.length; i++) {
                listItems.push(
                    <div key={i} className={styles.searchResult}>
                        {Lists[i]}
                    </div>
                );
            }
            return listItems
        } else {
            return <div>검색 결과가 없습니다.</div>;
        } 
    }

    return (
        <div className={styles.container} ref={resultsRef}>
            <div className={`${styles.box} ${showResults ? styles.expended : styles.collapsed}`}>
                <div className={styles.searchBox}>
                    <label htmlFor='searchInput' className={styles.searchBtn} onClick={searchKeyword}>
                        <i className={`${styles.searchIcon} bi bi-search`}/>
                    </label>
                    <input
                        id="searchInput"
                        className={styles.input}
                        onFocus={handleInputChange}
                        onChange={searchKeyword}
                    />
                </div>
                { showResults ? 
                    <div className={styles.resultContainer}>
                        <div className={styles.resultBox}>
                            <div className={styles.title}>
                                게시판
                            </div>
                            {generateList(communities)}
                        </div>
                        <div className={styles.resultBox}>
                            <div className={styles.title}>
                                유저
                            </div>
                            {generateList(users)}
                        </div>
                    </div> :
                    ''
                }
            </div>
        </div>
    );
}

export default SearchBox;