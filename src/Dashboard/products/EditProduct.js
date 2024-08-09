


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function EditProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        draw_date: '',
        reward_id: '',
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [rewards, setRewards] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true); // Set loading to true before starting fetch
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                const productData = response.data;
                setFormData({
                    name: productData.name,
                    price: productData.price,
                    quantity: productData.quantity,
                    description: productData.description,
                    draw_date: productData.draw_date,
                    reward_id: productData.reward_id,
                });
                if (productData.image) {
                    setImagePreview(productData.image);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Error fetching product data.');
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/rewards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRewards(response.data.rewards || []);
            } catch (error) {
                console.error('Error fetching rewards:', error);
                toast.error('Error fetching rewards.');
            }
        };

        fetchProduct();
        fetchRewards();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            // Update product details excluding image
            await axios.put(`http://localhost:8000/api/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            // Upload image if present
            if (image) {
                const formDataImage = new FormData();
                formDataImage.append('image', image);
                await axios.post(`http://localhost:8000/api/products/${id}/upload-image`, formDataImage, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            toast.success('Product updated successfully!');
            navigate('/dashboard/products');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast.error(`Error updating product: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} /> {/* Add Sidebar with toggle functionality */}
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="container-fluid p-5  mt-5">
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader /> {/* Show loader while loading */}
                            </div>
                        ) : (
                            <div className="card shadow-sm rounded p-4 bg-light">
                                <h1 className="mb-4 fs-4 fw-bold text-dark">Edit Product</h1>
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
                                            {rewards.map((reward) => (
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
                                        {imagePreview && (
                                            <div className="mt-3">
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Image preview" 
                                                    className="img-fluid rounded shadow-sm" 
                                                    style={{ maxWidth: '100%', maxHeight: '120px' }} 
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <button type="submit" className="btn btn-primary shadow-sm rounded">Save Changes</button>
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

export default EditProduct;
