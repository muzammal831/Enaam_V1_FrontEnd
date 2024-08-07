


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Adjust the import path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BannerList() {
    const [banners, setBanners] = useState([]);
    const [platform, setPlatform] = useState('desktop');
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/banners/platform/${platform}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data && Array.isArray(response.data.banners)) {
                    setBanners(response.data.banners);
                } else {
                    setBanners([]); // Ensure banners is an empty array if the response format is unexpected
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching banners:', error);
                toast.error(`Error fetching banners: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
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
            await axios.delete(`http://3.138.38.248/Enaam_Backend_V1/public/api/banners/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setBanners(banners.filter(banner => banner.id !== id));
            toast.success('Banner deleted successfully!');
        } catch (error) {
            console.error('Error deleting banner:', error);
            toast.error(`Error deleting banner: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleAddClick = () => {
        navigate('/dashboard/banners/add');
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">Banners List</h1>
                            <button
                                className="btn btn-primary shadow-sm"
                                onClick={handleAddClick}
                            >
                                <i className="bi bi-plus-circle me-2"></i>Add New Banner
                            </button>
                        </div>

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

                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader /> {/* Assuming you have a Loader component */}
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-striped table-bordered shadow-sm rounded">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Image</th>
                                            <th>Description</th>
                                            <th>Product Link</th>
                                            <th>Platform</th>
                                            <th className="col-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {banners.length ? (
                                            banners.map(banner => (
                                                <tr key={banner.id}>
                                                    <td>
                                                        <img
                                                            src={banner.image}
                                                            alt={banner.description}
                                                            className="img-fluid"
                                                            style={{ maxWidth: '100px', borderRadius: '10px' }}
                                                        />
                                                    </td>
                                                    <td>{banner.description}</td>
                                                    <td>{banner.product_link}</td>
                                                    <td>{banner.platform}</td>
                                                    <td className="text-center">
                                                        {/* <button
                                                            className="btn btn-primary btn-sm me-2"
                                                            onClick={() => handleView(banner.id)}
                                                        >
                                                            <i className="bi bi-eye"></i>
                                                        </button> */}
                                                        <button
                                                            className="btn btn-primary btn-sm me-2"
                                                            onClick={() => handleEdit(banner.id)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm me-2"
                                                            onClick={() => handleDelete(banner.id)}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="5" className="text-center">No banners available</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default BannerList;
