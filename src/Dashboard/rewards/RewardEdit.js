


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

function RewardEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const fetchReward = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/rewards/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setName(response.data.name);
                setDescription(response.data.description);
                setCurrentImage(response.data.image); // Assuming `image_url` is the field for the current image
            } catch (error) {
                console.error(error);
            }
        };

        fetchReward();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Prepare text data
        const textData = {
            name,
            description,
        };

        // Handle file upload
        const formData = new FormData();
        formData.append('image', image);

        try {
            // First update text fields
            await axios.put(`http://localhost:8000/api/rewards/${id}`, textData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            // Then upload file if exists
            if (image) {
                await axios.post(`http://localhost:8000/api/rewards/${id}/upload`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            navigate('/dashboard/rewards'); // Redirect after successful update
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar /> {/* Add Sidebar */}
                </div>
                <div className="col-md-10">
                    <div className="container mt-5">
                        <div className="p-4 bg-light rounded shadow-sm">
                            <h1 className="mb-4 fs-4 fw-bold text-dark">Edit Reward</h1>
                            <form onSubmit={handleUpdate}>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="form-control" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)} 
                                        required 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="currentImage" className="form-label">Current Image</label>
                                    {currentImage && (
                                        <div className="mb-3">
                                            <img 
                                                src={currentImage} 
                                                alt="Current Reward" 
                                                className="img-thumbnail"
                                                style={{ width: '200px', height: 'auto' }} 
                                            />
                                        </div>
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">New Image</label>
                                    <input 
                                        type="file" 
                                        id="image" 
                                        className="form-control" 
                                        onChange={(e) => setImage(e.target.files[0])} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea 
                                        id="description" 
                                        className="form-control" 
                                        value={description} 
                                        onChange={(e) => setDescription(e.target.value)} 
                                        required 
                                    ></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary shadow-sm">
                                    Update Reward
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RewardEdit;
