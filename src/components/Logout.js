import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            localStorage.removeItem('token');
            navigate('/login');
        } catch (error) {
            console.error(error);
            alert('Error logging out.');
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
