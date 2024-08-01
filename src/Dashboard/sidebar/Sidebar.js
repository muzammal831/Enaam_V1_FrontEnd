

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css'; // Import CSS for styling

function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);
    const location = useLocation();

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* <button className="sidebar-toggle" onClick={toggleSidebar}>
                {isOpen ? <i className="bi bi-chevron-left"></i> : <i className="bi bi-chevron-right"></i>}
            </button> */}
            <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
           
                <img
                    style={{ width: '150px', height: 'auto' }}
                    className="logo"
                    src="https://enaam.pk/assets/images/logo.png"
                    alt="Logo"
                />
                <ul className="sidebar-menu">
                    <li>
                        <Link
                            to="/dashboard/"
                            className={`sidebar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                        >
                            <i className="bi bi-house-door"></i> Users
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/rewards"
                            className={`sidebar-link ${location.pathname === '/rewards' ? 'active' : ''}`}
                        >
                            <i className="bi bi-trophy"></i> Rewards
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/products"
                            className={`sidebar-link ${location.pathname === '/products' ? 'active' : ''}`}
                        >
                            <i className="bi bi-box"></i> Products
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/questions"
                            className={`sidebar-link ${location.pathname === '/questions' ? 'active' : ''}`}
                        >
                            <i className="bi bi-question-circle"></i> Questions
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/faqs"
                            className={`sidebar-link ${location.pathname === '/faqs' ? 'active' : ''}`}
                        >
                            <i className="bi bi-question"></i> FAQs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/about-us"
                            className={`sidebar-link ${location.pathname === '/about-us' ? 'active' : ''}`}
                        >
                            <i className="bi bi-info-circle"></i> About Us
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/blogs"
                            className={`sidebar-link ${location.pathname === '/blogs' ? 'active' : ''}`}
                        >
                            <i className="bi bi-journal-text"></i> Blogs
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/videos"
                            className={`sidebar-link ${location.pathname === '/videos' ? 'active' : ''}`}
                        >
                            <i className="bi bi-film"></i> Videos
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/banners"
                            className={`sidebar-link ${location.pathname === '/banners' ? 'active' : ''}`}
                        >
                            <i className="bi bi-image"></i> Banners
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/invoices"
                            className={`sidebar-link ${location.pathname === '/invoices' ? 'active' : ''}`}
                        >
                            <i className="bi bi-receipt"></i> Invoices
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/dashboard/contacts"
                            className={`sidebar-link ${location.pathname === '/contacts' ? 'active' : ''}`}
                        >
                            <i className="bi bi-telephone"></i> Contacts
                        </Link>
                    </li>
                </ul>
                <div className="sidebar-submenu">
                    <h5>Banner Categories</h5>
                    {/* <ul className="submenu-list">
                        <li><Link to="/dashboard/banners/desktop">Desktop Banners</Link></li>
                        <li><Link to="/dashboard/banners/mobile">Mobile Banners</Link></li>
                        <li><Link to="/dashboard/banners/mobilead">Mobile Ads Banners</Link></li>
                        <li><Link to="/dashboard/banners/both">All Platforms</Link></li>
                    </ul> */}
                </div>
            </div>
        </>
    );
}

export default Sidebar;
