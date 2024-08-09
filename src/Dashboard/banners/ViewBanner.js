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
                const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/banners/${id}`, {
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

    if (!banner) return <div className="loading">Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar /> {/* Add the Sidebar */}
                </div>
                <div className="col-md-10 mt-5">
                    <div className="card banner-card shadow-sm rounded">
                        <img
                            src={banner.image}
                            alt="Banner"
                            className="card-img-top banner-image "
                        />
                        <div className="card-body text-center">
                            <h1 className="card-title mb-3">{banner.description}</h1>
                            <a href={banner.product_link} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                <i className="bi bi-link"></i> Product Link
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBanner;
