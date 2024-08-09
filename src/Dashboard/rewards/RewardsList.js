


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Adjust the import path if necessary

function RewardsList() {
    const [rewards, setRewards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [rewardToDelete, setRewardToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/rewards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.data.status === 200 && Array.isArray(response.data.rewards)) {
                    setRewards(response.data.rewards);
                } else {
                    console.error('Unexpected response format:', response.data);
                    toast.error('Unexpected response format.');
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

    const handleDelete = async () => {
        try {
            await axios.delete(`http://3.138.38.248/Enaam_Backend_V1/public/api/rewards/${rewardToDelete}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setRewards(rewards.filter(reward => reward.id !== rewardToDelete));
            toast.success('Reward deleted successfully!');
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Error deleting reward:', error);
            toast.error(`Error deleting reward: ${error.response?.data?.message || error.message}`);
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    const filteredRewards = rewards.filter(reward =>
        reward.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reward.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">Rewards List</h1>
                            <Link to="/dashboard/rewards/create" className="btn btn-primary shadow-sm">
                                <i className="bi bi-plus-circle me-2    "></i>Add Reward
                            </Link>
                        </div>

                        <input
                            type="text"
                            placeholder="Search rewards..."
                            className="form-control mb-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader /> {/* Assuming you have a Loader component */}
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-striped table-bordered shadow-sm rounded">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Sr</th>
                                            <th>ID</th>
                                            <th className="col-2">Name</th>
                                            <th className='text-center'>Image</th>
                                            <th className="col-4">Description</th> {/* Adjusted column width */}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredRewards.length ? (
                                            filteredRewards.map(reward => (
                                                <tr key={reward.id}>
                                                    <td>{filteredRewards.indexOf(reward) + 1}</td>
                                                    <td>{reward.id}</td>
                                                    <td>{reward.name}</td>
                                                    <td className='text-center'>
                                                        {reward.image && (
                                                            <img
                                                            
                                                                src={reward.image}
                                                                alt={reward.name}
                                                                className="img-fluid"
                                                                style={{ width: '90px', height: '70px', borderRadius: '10px' }} // Adjusted size
                                                            />
                                                        )}
                                                    </td>
                                                    <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                                        {reward.description}
                                                    </td>
                                                    <td className="text-center">
                                                        <Link
                                                            to={`/dashboard/rewards/${reward.id}/edit`}
                                                            className="btn btn-primary btn-sm me-2 mt-3"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>
                                                        <button
                                                            className="btn btn-danger btn-sm mt-3 me-2"
                                                            onClick={() => {
                                                                setRewardToDelete(reward.id);
                                                                setShowDeleteModal(true);
                                                            }}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No rewards found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this reward?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default RewardsList;
