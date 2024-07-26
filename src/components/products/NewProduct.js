


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

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
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/rewards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRewards(response.data);
            } catch (error) {
                console.error('Error fetching rewards:', error);
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
            const response = await axios.post('http://localhost:8000/api/admin/products', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            const productId = response.data.id;

            if (image) {
                const imageData = new FormData();
                imageData.append('image', image);
                await axios.post(`http://localhost:8000/api/admin/products/${productId}/upload-image`, imageData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            navigate('/admin/products');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar /> {/* Add Sidebar */}
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <h1 className="mb-4">Add New Product</h1>
                        <form onSubmit={handleSubmit}>
                            {/* Form fields */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="draw_date" className="form-label">Draw Date</label>
                                <input type="date" className="form-control" id="draw_date" name="draw_date" value={formData.draw_date} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reward_id" className="form-label">Reward</label>
                                <select className="form-control" id="reward_id" name="reward_id" value={formData.reward_id} onChange={handleChange} required>
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
                                <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewProduct;
