


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer and toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for toast
import Header from '../sidebar/Header';

function EditBanner() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [banner, setBanner] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        product_link: '',
        platform: 'desktop',
        image: null,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchBanner = async () => {
            setLoading(true); // Set loading to true before starting fetch
            try {
                const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/banners/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBanner(response.data);
                setFormData({
                    description: response.data.description,
                    product_link: response.data.product_link,
                    platform: response.data.platform,
                    image: null,
                });
            } catch (error) {
                toast.error('Error fetching banner: ' + (error.response?.data?.message || error.message)); // Show error message
                console.error('Error fetching banner:', error);
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchBanner();
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

        // Send text fields as JSON
        const textFields = {
            description: formData.description,
            product_link: formData.product_link,
            platform: formData.platform,
        };

        try {
            await axios.put(`http://3.138.38.248/Enaam_Backend_V1/public/api/banners/${id}`, textFields, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Handle image upload separately
            if (formData.image) {
                const imageData = new FormData();
                imageData.append('image', formData.image);

                await axios.post(`http://3.138.38.248/Enaam_Backend_V1/public/api/banners/${id}/upload-image`, imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            toast.success('Banner updated successfully!'); // Show success message
            navigate('/dashboard/banners');
        } catch (error) {
            toast.error('Error updating banner: ' + (error.response?.data?.message || error.message)); // Show error message
            console.error('Error updating banner:', error);
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

    if (!banner) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                {/* Sidebar */}
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                {/* Form Content */}
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12 mt-3'} ms-auto`}>
                   <Header />
                    <div className="container-fluid  mt-4 p-5 bg-light rounded shadow-sm">
                        <h1 className="mb-4">Edit Banner</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="product_link" className="form-label">Product Link</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="product_link"
                                    name="product_link"
                                    value={formData.product_link}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="platform" className="form-label">Platform</label>
                                <select
                                    className="form-select"
                                    id="platform"
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
                                <label htmlFor="image" className="form-label">Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="image"
                                    name="image"
                                    onChange={handleChange}
                                />
                                {banner.image && (
                                    <img
                                        src={banner.image}
                                        alt="Banner"
                                       style={{ width: '120px', height: '70px', marginTop: '10px', borderRadius: '10px' }}
                                        className="mt-2"
                                    />
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update Banner
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default EditBanner;
