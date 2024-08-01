

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

function ProductForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null); // New state for image URL
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');
    const [drawDate, setDrawDate] = useState('');
    const [rewardOptions, setRewardOptions] = useState([]);
    const [selectedReward, setSelectedReward] = useState('');

    useEffect(() => {
        const fetchRewardOptions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/rewards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setRewardOptions(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        if (id) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://localhost:8000/api/products/${id}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`
                        }
                    });
                    const product = response.data;
                    setName(product.name);
                    setPrice(product.price);
                    setQuantity(product.quantity);
                    setDescription(product.description);
                    setDrawDate(product.draw_date);
                    setSelectedReward(product.reward_id);
                    setImageUrl(product.image_url); // Set the image URL
                } catch (error) {
                    console.error(error);
                }
            };

            fetchProduct();
        }

        fetchRewardOptions();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            name,
            price,
            quantity,
            description,
            draw_date: drawDate,
            reward_id: selectedReward,
        };

        try {
            const url = id 
                ? `http://localhost:8000/api/products/${id}`
                : 'http://localhost:8000/api/products';
            const method = id ? 'put' : 'post';
            
            await axios[method](url, productData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            if (image) {
                const formData = new FormData();
                formData.append('image', image);

                await axios.post(`http://localhost:8000/api/products/${id}/upload`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            navigate('/products');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setImageUrl(URL.createObjectURL(file)); // Update the image URL for preview
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar /> {/* Add Sidebar */}
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <h1>{id ? 'Edit' : 'Add'} Product</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image</label>
                                <input type="file" className="form-control" onChange={handleImageChange} />
                                {imageUrl && (
                                    <div className="mt-3">
                                        <img src={imageUrl} alt="Selected" style={{ width: '150px', height: 'auto' }} />
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Price</label>
                                <input type="number" step="0.01" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Quantity</label>
                                <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Draw Date</label>
                                <input type="date" className="form-control" value={drawDate} onChange={(e) => setDrawDate(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Reward</label>
                                <select className="form-control" value={selectedReward} onChange={(e) => setSelectedReward(e.target.value)} required>
                                    <option value="">Select Reward</option>
                                    {rewardOptions.map(reward => (
                                        <option key={reward.id} value={reward.id}>{reward.name}</option>
                                    ))}
                                </select>
                            </div>
                            <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Add'} Product</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductForm;
