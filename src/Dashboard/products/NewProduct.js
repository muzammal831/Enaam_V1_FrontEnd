


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function NewProduct() {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        draw_date: '',
        reward_id: '',
    });
    const [image, setImage] = useState(null);
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/rewards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.status === 200 && Array.isArray(response.data.rewards)) {
                    setRewards(response.data.rewards);
                } else {
                    console.error('Unexpected response format:', response.data);
                    toast.error('Unexpected response format while fetching rewards.');
                }
            } catch (error) {
                console.error('Error fetching rewards:', error);
                toast.error(`Error fetching rewards: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchRewards();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true); // Set loading to true before starting submission
            // Post product data
            const response = await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/products', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const productId = response.data.id;

            // Handle image upload
            if (image) {
                const imageData = new FormData();
                imageData.append('image', image);
                await axios.post(`http://3.138.38.248/Enaam_Backend_V1/public/api/products/${productId}/upload-image`, imageData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            toast.success('Product added successfully!');
            navigate('/dashboard/products');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast.error(`Error adding product: ${error.response?.data?.message || error.message}`);
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
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader /> {/* Show loader while loading */}
                            </div>
                        ) : (
                            <div className="p-4 bg-light rounded shadow-sm">
                                <h1 className="mb-4 fs-4 fw-bold text-dark">Add New Product</h1>
                                <form onSubmit={handleSubmit}>
                                    {/* Form fields */}
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control shadow-sm rounded" 
                                            id="name" 
                                            name="name" 
                                            value={formData.name} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="price" className="form-label">Price</label>
                                        <input 
                                            type="number" 
                                            className="form-control shadow-sm rounded" 
                                            id="price" 
                                            name="price" 
                                            value={formData.price} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="quantity" className="form-label">Quantity</label>
                                        <input 
                                            type="number" 
                                            className="form-control shadow-sm rounded" 
                                            id="quantity" 
                                            name="quantity" 
                                            value={formData.quantity} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea 
                                            className="form-control shadow-sm rounded" 
                                            id="description" 
                                            name="description" 
                                            value={formData.description} 
                                            onChange={handleChange} 
                                            required 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="draw_date" className="form-label">Draw Date</label>
                                        <input 
                                            type="date" 
                                            className="form-control shadow-sm rounded" 
                                            id="draw_date" 
                                            name="draw_date" 
                                            value={formData.draw_date} 
                                            onChange={handleChange} 
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="reward_id" className="form-label">Reward</label>
                                        <select 
                                            className="form-control shadow-sm rounded" 
                                            id="reward_id" 
                                            name="reward_id" 
                                            value={formData.reward_id} 
                                            onChange={handleChange} 
                                            required
                                        >
                                            <option value="">Select Reward</option>
                                            {!loading && rewards.map((reward) => (
                                                <option key={reward.id} value={reward.id}>
                                                    {reward.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="image" className="form-label">Image</label>
                                        <input 
                                            type="file" 
                                            className="form-control shadow-sm rounded" 
                                            id="image" 
                                            name="image" 
                                            onChange={handleImageChange} 
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary shadow-sm rounded">Submit</button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default NewProduct;
