

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function CreateAboutUs() {
    const [formData, setFormData] = useState({
        heading: '',
        about_detail: '',
        about_image: null,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

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

        const form = new FormData();
        form.append('heading', formData.heading);
        form.append('about_detail', formData.about_detail);
        if (formData.about_image) {
            form.append('about_image', formData.about_image);
        }

        try {
            await axios.post('http://localhost:8000/api/about-us', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('About Us data created successfully!');
            navigate('/dashboard/about-us');
        } catch (error) {
            console.error('Error creating About Us data:', error.response ? error.response.data : error.message);
            toast.error(`Error: ${error.response ? error.response.data.message : 'Failed to create About Us data.'}`);
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
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="container-fluid p-5 mt-5">
                        <div className="p-4 bg-light rounded shadow-sm">
                            {loading ? (
                                <div className="d-flex justify-content-center">
                                    <Loader /> {/* Show loader while loading */}
                                </div>
                            ) : (
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h1 className="mb-4 fs-4 fw-bold text-dark">Create About Us</h1>
                                     
                                    </div>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Heading</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="heading"
                                                value={formData.heading}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">About Detail</label>
                                            <textarea
                                                className="form-control"
                                                name="about_detail"
                                                value={formData.about_detail}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">About Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="about_image"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary shadow-sm bi bi-plus">
                                            Create
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

export default CreateAboutUs;
