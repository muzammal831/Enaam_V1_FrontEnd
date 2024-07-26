import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import './Sidebar.css'; // Import CSS for styling

function Sidebar() {
    const location = useLocation();
    
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Admin Panel</h2>
            <ul className="sidebar-menu">
                <li>
                    <Link 
                        to="/dashboard" 
                        className={`sidebar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                    >
                        <i className="bi bi-house-door"></i> Users
                    </Link>
                </li>
                
                
                <li>
                    <Link 
                        to="/rewards" 
                        className={`sidebar-link ${location.pathname === '/rewards' ? 'active' : ''}`}
                    >
                        <i className="bi bi-trophy"></i> Rewards
                    </Link>
                </li>
                
                <li>
                    <Link 
                        to="/products" 
                        className={`sidebar-link ${location.pathname === '/products' ? 'active' : ''}`}
                    >
                        <i className="bi bi-box"></i> Products
                    </Link>
                </li>
                
                <li>
                    <Link 
                        to="/questions" 
                        className={`sidebar-link ${location.pathname === '/questions' ? 'active' : ''}`}
                    >
                        <i className="bi bi-question-circle"></i> Questions
                    </Link>
                </li>
                
                <li>
                    <Link 
                        to="/faqs" 
                        className={`sidebar-link ${location.pathname === '/faqs' ? 'active' : ''}`}
                    >
                        <i className="bi bi-question"></i> FAQs
                    </Link>
                </li>
                
                <li>
                    <Link 
                        to="/about-us" 
                        className={`sidebar-link ${location.pathname === '/about-us' ? 'active' : ''}`}
                    >
                        <i className="bi bi-info-circle"></i> About Us
                    </Link>
                </li>
                
                <li>
                    <Link 
                        to="/blogs" 
                        className={`sidebar-link ${location.pathname === '/blogs' ? 'active' : ''}`}
                    >
                        <i className="bi bi-journal-text"></i> Blogs
                    </Link>
                </li>
                
                <li>
                    <Link 
                        to="/videos" 
                        className={`sidebar-link ${location.pathname === '/videos' ? 'active' : ''}`}
                    >
                        <i className="bi bi-film"></i> Videos
                    </Link>
                </li>
                
                <li>
                    <Link 
                        to="/banners" 
                        className={`sidebar-link ${location.pathname === '/banners' ? 'active' : ''}`}
                    >
                        <i className="bi bi-image"></i> Banners
                    </Link>
                </li>
            </ul>
            <div className="sidebar-submenu">
                <h5>Banner Categories</h5>
                <ul className="submenu-list">
                    <li><Link to="/banners/desktop">Desktop Banners</Link></li>
                    <li><Link to="/banners/mobile">Mobile Banners</Link></li>
                    <li><Link to="/banners/mobilead">Mobile Ads Banners</Link></li>
                    <li><Link to="/banners/both">All Platforms</Link></li>
                </ul>
            </div>
        </div>
    );
}

export default Sidebar;
