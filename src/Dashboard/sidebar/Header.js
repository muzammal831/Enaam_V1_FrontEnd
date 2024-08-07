// Header.js

import React from 'react';
import './Header.css'; // Import CSS for styling

function Header({ isOpen }) {
    return (
        <div className={`header ${isOpen ? 'header-expanded' : 'header-collapsed'}`}>
            <h1>Dashboard</h1>
        </div>
    );
}

export default Header;
