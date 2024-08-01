import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component
function BannerDisplay({ platform }) {
    const [banners, setBanners] = useState([]);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/banners/platform/${platform}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBanners(response.data);
            } catch (error) {
                console.error('Error fetching banners:', error);
            }
        };

        fetchBanners();
    }, [platform]);

    return (
        <div className="d-flex">
            <Sidebar /> {/* Add the Sidebar */}
            <div className="container mt-5 ms-5">
                <h1>Banners for {platform}</h1>
                {banners.length ? (
                    <div className="row">
                        {banners.map(banner => (
                            <div key={banner.id} className="col-md-4 mb-4">
                                <div className="card">
                                    <img
                                        src={banner.image}
                                        alt="Banner"
                                        className="card-img-top"
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{banner.description}</h5>
                                        <a href={banner.product_link} className="btn btn-primary">Product Link</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No banners available for this platform.</p>
                )}
            </div>
        </div>
    );
}

export default BannerDisplay;
