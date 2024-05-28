import React from 'react';
import Header from './header.js';
import Sidebar from './Sidebar.js';

function Interface({children}) {
    return (
        <div>
            <Header/>
            <Sidebar>
                <div>sidebar 자식</div>
            </Sidebar>
            <div>
                {children}
            </div>
        </div>
    );
} 

export default Interface;