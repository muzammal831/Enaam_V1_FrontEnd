



import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function CreateReward() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true before starting submission
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);

        try {
            await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/rewards', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            toast.success('Reward created successfully!');
            navigate('/dashboard/rewards'); // Redirect to the rewards list page
        } catch (error) {
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || 'Failed to create reward.'}`);
            } else if (error.request) {
                toast.error('Error: No response from the server.');
            } else {
                toast.error(`Error: ${error.message}`);
            }
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
                        <div className="p-4 bg-light rounded shadow-sm">
                            {loading ? (
                                <div className="d-flex justify-content-center">
                                    <Loader /> {/* Show loader while loading */}
                                </div>
                            ) : (
                                <div>
                                    <h1 className="mb-4 fs-4 fw-bold text-dark">Create Reward</h1>
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                                            <label htmlFor="description" className="form-label">Description</label>
                                            <textarea 
                                                id="description" 
                                                className="form-control" 
                                                value={description} 
                                                onChange={(e) => setDescription(e.target.value)} 
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="image" className="form-label">Image</label>
                                            <input 
                                                type="file" 
                                                id="image" 
                                                className="form-control" 
                                                onChange={(e) => setImage(e.target.files[0])} 
                                                required 
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary shadow-sm">
                                            Create
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

export default CreateReward;
