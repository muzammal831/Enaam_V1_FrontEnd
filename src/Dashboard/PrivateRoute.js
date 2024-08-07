

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ element: Component, ...rest }) => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    const location = useLocation();

    console.log('Token:', token);  // Debugging
    console.log('Role:', role);    // Debugging

    if (!token) {
        // If no token, redirect to login
        return <Navigate to="/dashboard/login" state={{ from: location }} />;
    }

    if (role === 'admin') {
        // If role is admin, render the component
        return <Component />;
    } else if (role === 'user') {
        // If role is user, redirect to homepage
        return <Navigate to="/" />;
    } else {
        // If role is unknown or undefined, handle appropriately
        return <Navigate to="/dashboard/login" state={{ from: location }} />;
    }
};

export default PrivateRoute;
