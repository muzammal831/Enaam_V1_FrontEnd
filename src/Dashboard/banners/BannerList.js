import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component
function BannerList() {
    const [banners, setBanners] = useState([]);
    const [platform, setPlatform] = useState('desktop');
    const navigate = useNavigate();
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
    const handleEdit = (id) => {
        navigate(`/dashboard/banners/${id}/edit`);
    };
    const handleView = (id) => {
        navigate(`/dashboard/banners/${id}`);
    };
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/banners/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setBanners(banners.filter(banner => banner.id !== id));
        } catch (error) {
            console.error('Error deleting banner:', error);
        }
    };
    return (
        <div className="d-flex container-fluid">
            {/* <Sidebar /> */}
            <div className="col-md-2">
                    <Sidebar />
            </div>
            <div className="container-fluid mt-5 ms-3">
                <h1 className="mb-4">Banners List</h1>
                <div className="mb-3">
                    <select
                        className="form-select mb-3"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                    >
                        <option value="desktop">Desktop</option>
                        <option value="mobile">Mobile</option>
                        <option value="mobilead">Mobile Ads</option>
                        <option value="both">Both</option>
                    </select>
                </div>
                <button
                    className="btn btn-primary mb-3"
                    onClick={() => navigate('/dashboard/banners/add')}
                >
                    Add New Banner
                </button>
                <div className="table-responsive">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Description</th>
                                <th>Product Link</th>
                                <th>Platform</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {banners.map(banner => (
                                <tr key={banner.id}>
                                    <td>
                                        <img
                                            src={banner.image}
                                            alt={banner.description}
                                            className="img-fluid"
                                            style={{ maxWidth: '100px' }}
                                        />
                                    </td>
                                    <td>{banner.description}</td>
                                    <td>{banner.product_link}</td>
                                    <td>{banner.platform}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary me-2"
                                            onClick={() => handleView(banner.id)}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-secondary me-2"
                                            onClick={() => handleEdit(banner.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(banner.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default BannerList;