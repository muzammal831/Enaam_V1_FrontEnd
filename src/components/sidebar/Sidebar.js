import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // Import CSS for styling

function Sidebar() {
    return (
        <div className="sidebar">
            <h2 className="sidebar-title">Admin Panel</h2>
            <ul className="sidebar-menu">
                <li>
                    <Link to="/admin/dashboard" className="sidebar-link">Dashboard</Link>
                </li>
                <li>
                    <Link to="/admin/dashboard" className="sidebar-link">Users</Link>
                </li>
                <li>
                    <Link to="/admin/rewards" className="sidebar-link">rewards</Link>
                </li>
                <li>
                    <Link to="/admin/products" className="sidebar-link">product</Link>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
