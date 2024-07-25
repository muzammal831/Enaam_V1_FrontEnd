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
                        to="/admin/dashboard" 
                        className={`sidebar-link ${location.pathname === '/admin/dashboard' ? 'active' : ''}`}
                    >
                        <i className="bi bi-people"></i> Users
                    </Link>
                </li>
                
                <li>
                    <Link 
                        to="/admin/rewards" 
                        className={`sidebar-link ${location.pathname === '/admin/rewards' ? 'active' : ''}`}
                    >
                        <i className="bi bi-trophy"></i> Rewards
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/admin/products" 
                        className={`sidebar-link ${location.pathname === '/admin/products' ? 'active' : ''}`}
                    >
                        <i className="bi bi-box"></i> Products
                    </Link>
                </li>
                <li>
                    <Link 
                        to="/admin/questions" 
                        className={`sidebar-link ${location.pathname === '/admin/questions' ? 'active' : ''}`}
                    >
                        <i className="bi bi-question-circle"></i> Questions
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
