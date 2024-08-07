


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function EditAboutUs() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [aboutUs, setAboutUs] = useState(null);
    const [formData, setFormData] = useState({
        heading: '',
        about_detail: '',
        about_image: null,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchAboutUs = async () => {
            setLoading(true); // Set loading to true before starting fetch
            try {
                const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/about-us/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setAboutUs(response.data);
                setFormData({
                    heading: response.data.heading,
                    about_detail: response.data.about_detail,
                    about_image: null, // We don't prefill this with the existing image
                });
            } catch (error) {
                console.error('Error fetching About Us data:', error);
                toast.error('Failed to fetch About Us data.');
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchAboutUs();
    }, [id]);

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
            // Send JSON payload for text fields
            await axios.put(`http://3.138.38.248/Enaam_Backend_V1/public/api/about-us/${id}`, {
                heading: formData.heading,
                about_detail: formData.about_detail,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Handle file upload separately if there's an image
            if (formData.about_image) {
                const fileFormData = new FormData();
                fileFormData.append('about_image', formData.about_image);

                await axios.post(`http://3.138.38.248/Enaam_Backend_V1/public/api/about-us/${id}/upload-image`, fileFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            toast.success('About Us updated successfully!');
            navigate('/dashboard/about-us');
        } catch (error) {
            console.error('Error updating About Us data:', error);
            toast.error('Failed to update About Us data.');
        } finally {
            setLoading(false); // Set loading to false after submission
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    if (loading) {
        return (
            <div className="container mt-5 d-flex justify-content-center">
                <Loader /> {/* Show loader while loading */}
            </div>
        );
    }

    if (!aboutUs) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="container-fluid col-11 mt-5 p-5 bg-light rounded shadow-sm ">
                        <h1 className="mb-4">Edit About Us</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="heading" className="form-label">Heading</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="heading"
                                    name="heading"
                                    value={formData.heading}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="about_detail" className="form-label">About Detail</label>
                                <textarea
                                    className="form-control"
                                    id="about_detail"
                                    name="about_detail"
                                    value={formData.about_detail}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="about_image" className="form-label">About Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="about_image"
                                    name="about_image"
                                    onChange={handleChange}
                                />
                                {aboutUs.about_image && (
                                    <img
                                    style={{ borderRadius: '10px' }}
                                        src={aboutUs.about_image}
                                        alt="About Us"
                                        width="100"
                                        className="mt-2"
                                    />
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary bi bi-plus">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default EditAboutUs;
