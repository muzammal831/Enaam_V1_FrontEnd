

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component
import './AddBanner.css'; // Import the CSS file for styling
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import Header from '../sidebar/Header';

function AddBanner() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: '',
        product_link: '',
        platform: 'desktop',
        image: null,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(false); // Add loading state

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true before starting submission

        const data = new FormData();
        data.append('description', formData.description);
        data.append('product_link', formData.product_link);
        data.append('platform', formData.platform);
        data.append('image', formData.image);

        try {
            await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/banners', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('Banner added successfully!'); // Show success message
            navigate('/dashboard/banners');
        } catch (error) {
            toast.error('Error adding banner: ' + (error.response?.data?.message || error.message)); // Show error message
            console.error('Error adding banner:', error);
        } finally {
            setLoading(false); // Set loading to false after submission
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12 mt-3'} ms-auto`}>
                    <Header />
                    <div className="container-fluid mt-4">
                        <div className="p-4 bg-light rounded shadow-sm">
                            {loading ? (
                                <div className="d-flex justify-content-center">
                                    <Loader /> {/* Show loader while loading */}
                                </div>
                            ) : (
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h1 className="mb-4 fs-4 fw-bold text-dark">Add New Banner</h1>
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Description</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Product Link</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="product_link"
                                                value={formData.product_link}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Platform</label>
                                            <select
                                                className="form-select"
                                                name="platform"
                                                value={formData.platform}
                                                onChange={handleChange}
                                            >
                                                <option value="desktop">Desktop</option>
                                                <option value="mobile">Mobile</option>
                                                <option value="mobilead">Mobile Ads</option>
                                                <option value="both">Both</option>
                                            </select>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="image"
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary shadow-sm bi bi-plus">
                                            Add Banner
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default AddBanner;
