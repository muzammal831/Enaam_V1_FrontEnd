


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component
import Header from '../sidebar/Header';

function AddBlog() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        heading: '',
        description: '',
        blog_image: null,
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

        try {
            // Post the blog data
            const response = await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/blogs', {
                heading: formData.heading,
                description: formData.description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Upload the blog image if provided
            if (formData.blog_image) {
                const fileFormData = new FormData();
                fileFormData.append('blog_image', formData.blog_image);

                await axios.post(`http://3.138.38.248/Enaam_Backend_V1/public/api/blogs/${response.data.id}/upload-image`, fileFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            // Notify the user and navigate
            toast.success('Blog added successfully!');
            navigate('/dashboard/blogs');
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error('Failed to add blog.');
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
                    <div className="container-fluid  mt-4">
                        <div className="p-4 bg-light rounded shadow-sm">
                            {loading ? (
                                <div className="d-flex justify-content-center">
                                    <Loader /> {/* Show loader while loading */}
                                </div>
                            ) : (
                                <div>
                                    <div className="d-flex justify-content-between align-items-center mb-4">
                                        <h1 className="mb-4 fs-4 fw-bold text-dark">Add New Blog</h1>
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
                                            <label className="form-label">Description</label>
                                            <textarea
                                                className="form-control"
                                                name="description"
                                                value={formData.description}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Blog Image</label>
                                            <input
                                                type="file"
                                                className="form-control"
                                                name="blog_image"
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary shadow-sm bi bi-plus">
                                            Add Blog
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

export default AddBlog;
