import React, { useState } from "react";
import styles from "./styles/boardPagingBtn.module.css"

function BoardPagingBtn({ metadata, setPage, setTitle, setUsername }) {
    const pageLength = metadata.pageLength;
    const currentPage = metadata.currentPage;
    const [ option, setOption ] = useState('제목');
    const [ keyword, setKeyword ] = useState(null);

    function searchKeyword() {
        if( option == '제목') {
            setUsername("")
            setTitle(keyword)
        } else if(option == '작성자') {
            setUsername(keyword)
            setTitle("")
        }
    }

    return (
        <div className={styles.container}>
            { !(currentPage == 1) ? <i onClick={() => setPage(currentPage-1)} className={`${styles.prevBtn} bi bi-caret-left`}></i> : <div className={styles.prevBtn}></div> }
            <div className={styles.box}>
                <select onChange={(e)=> setOption(e.target.value)}>
                    <option value='제목'>제목</option>
                    <option value='작성자'>작성자</option>
                </select>
                <input
                    id="searchInput"
                    className={styles.input}
                    onChange={(e) => setKeyword(e.target.value)}
                />
                <i onClick={() => searchKeyword()} className={`${styles.searchBtn} ${styles.searchIcon} bi bi-search`}/>
            </div>
            { !(currentPage == pageLength) ? <i onClick={() => setPage(currentPage+1)} className={`${styles.nextBtn} bi bi-caret-right`}></i> : <div className={styles.nextBtn}></div> }
        </div>
    )
}

export default BoardPagingBtn;