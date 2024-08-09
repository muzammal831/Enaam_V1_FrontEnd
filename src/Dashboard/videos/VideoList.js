


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Adjust the import path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function VideoList() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/videos', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.status === 200 && Array.isArray(response.data.videos)) {
                    setVideos(response.data.videos);
                } else {
                    console.error('Unexpected response format:', response.data);
                }
            } catch (error) {
                console.error('Error fetching videos:', error);
                toast.error(`Error fetching videos: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const handleEditClick = (id) => {
        navigate(`/dashboard/videos/${id}/edit`);
    };

    const handleViewClick = (id) => {
        navigate(`/dashboard/videos/${id}`);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://3.138.38.248/Enaam_Backend_V1/public/api/videos/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setVideos(videos.filter(video => video.id !== id));
            toast.success('Video deleted successfully!');
        } catch (error) {
            console.error('Error deleting video:', error);
            toast.error(`Error deleting video: ${error.response?.data?.message || error.message}`);
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleAddClick = () => {
        navigate("/dashboard/videos/add");
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (video.user && video.user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (video.reward && video.reward.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">Videos List</h1>
                            <button
                                className="btn btn-primary shadow-sm"
                                onClick={handleAddClick}
                            >
                                <i className="bi bi-plus-circle me-2"></i>Add New Video
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Search Videos..."
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
                                            <th>Title</th>
                                            <th>Thumbnail</th>
                                            <th>User Name</th>
                                            <th>Reward Name</th>
                                            <th>Date Announced</th>
                                            <th className="col-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredVideos.length ? (
                                            filteredVideos.map(video => (
                                                <tr key={video.id}>
                                                    <td className='text-truncate' style={{ maxWidth: '150px' }}>{video.title}</td>
                                                    <td className="text-center">
                                                        {video.thumbnail && (
                                                            <img style={{ borderRadius: '10px' }}
                                                                src={video.thumbnail}
                                                                alt={video.title}
                                                                width="100"
                                                                height="70"
                                                                className=""
                                                            />
                                                        )}
                                                    </td>
                                                    <td>{video.user ? video.user.name : 'N/A'}</td>
                                                    <td>{video.reward ? video.reward.name : 'N/A'}</td>
                                                    <td>{video.date_announced ? new Date(video.date_announced).toLocaleDateString() : 'N/A'}</td>
                                                    <td className="text-center">
                                                        <button
                                                            className="btn btn-primary btn-sm me-2"
                                                            onClick={() => handleEditClick(video.id)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm me-2"
                                                            onClick={() => {
                                                                setItemToDelete(video.id);
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
                                                <td colSpan="6" className="text-center">No videos available</td>
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
                                <p>Are you sure you want to delete this video?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteClick(itemToDelete)}>
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

export default VideoList;
