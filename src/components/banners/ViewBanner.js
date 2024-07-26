import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component
import './ViewBanner.css'; // Import the CSS file for additional styling

function ViewBanner() {
    const { id } = useParams();
    const [banner, setBanner] = useState(null);

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/banners/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBanner(response.data);
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };

        fetchBanner();
    }, [id]);

    if (!banner) return <div>Loading...</div>;

    return (
        <div className="d-flex">
            <Sidebar /> {/* Add the Sidebar */}
            <div className="container mt-5 ms-5">
                <h1 className="mb-4">{banner.description}</h1>
                <a href={banner.product_link} target="_blank" rel="noopener noreferrer" className="btn btn-link">
                    <i className="bi bi-link"></i> Product Link
                </a>
                <img
                    src={`http://localhost:8000/storage/banner_images/${banner.image}`}
                    alt="Banner"
                    className="img-fluid mt-3"
                />
            </div>
        </div>
    );
}

export default ViewBanner;
