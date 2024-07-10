import React, { useEffect, useState, useRef } from 'react';
import styles from './styles/modal.module.css';

function Modal({ title, isOpen, onClose, children }) {
    if (!isOpen) return null;
    return (
        <div onClick={onClose} className={`${styles.container}`}>
            <div className={styles.box} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}><div>{title}</div><i onClick={onClose} class="bi bi-x"/></div>
                {children}
            </div>
        </div>
    )
}

export default Modal;