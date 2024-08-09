


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function RewardEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [currentImage, setCurrentImage] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchReward = async () => {
            setLoading(true); // Set loading to true before starting fetch
            try {
                const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/rewards/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setName(response.data.name);
                setDescription(response.data.description);
                setCurrentImage(response.data.image); // Assuming `image` is the field for the current image
            } catch (error) {
                console.error(error);
                toast.error(`Error fetching reward: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false); // Set loading to false after fetch
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
        if (image) {
            formData.append('image', image);
        }

        try {
            // First update text fields
            await axios.put(`http://3.138.38.248/Enaam_Backend_V1/public/api/rewards/${id}`, textData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            // Then upload file if exists
            if (image) {
                await axios.post(`http://3.138.38.248/Enaam_Backend_V1/public/api/rewards/${id}/upload`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            toast.success('Reward updated successfully!');
            navigate('/dashboard/rewards'); // Redirect after successful update
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || 'Failed to update reward.'}`);
            } else if (error.request) {
                toast.error('Error: No response from the server.');
            } else {
                toast.error(`Error: ${error.message}`);
            }
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
                    <div className="container-fluid mt-5 col-11">
                        <div className="p-4 bg-light rounded shadow-sm">
                            {loading ? (
                                <div className="d-flex justify-content-center">
                                    <Loader /> {/* Show loader while loading */}
                                </div>
                            ) : (
                                <div>
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
                                                        className=""
                                                        style={{ width: '200px', height: 'auto', borderRadius: '10px' }} 
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
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default RewardEdit;
