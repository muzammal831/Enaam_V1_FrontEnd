
import React, { useState } from 'react';
import './Header.css'; // Import CSS for styling
import downloadImage from './images/download.png';

function Header({ isOpen }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div style={{width: '101%'}} className={`header ${isOpen ? 'header-expanded  ' : 'header-collapsed'}`}>
            <h1 className='text-white ms-3'>Admin</h1>
            <div className="profile-menu" onClick={toggleDropdown}>
                <div style={{margin: '10px',}} className="profile-icon bg-white ">
                    <img   src="https://static.vecteezy.com/system/resources/thumbnails/020/911/740/small_2x/user-profile-icon-profile-avatar-user-icon-male-icon-face-icon-profile-icon-free-png.png"  alt="User Profile" />
                </div>
                <div style={{marginLeft: '-150px',}} className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
                    <a href="/profile">Profile</a>
                    
                    <a href="/logout">Logout</a>
                </div>
            </div>
        </div>
    );
}

export default Header;
