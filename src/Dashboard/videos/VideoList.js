


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function VideoList() {
    const [videos, setVideos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/videos', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setVideos(response.data);
            } catch (error) {
                console.error('Error fetching videos:', error);
            }
        };

        fetchVideos();
    }, []);

    const handleEdit = (id) => {
        navigate(`/dashboard/videos/${id}/edit`);
    };

    const handleView = (id) => {
        navigate(`/dashboard/videos/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/videos/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setVideos(videos.filter(video => video.id !== id));
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container-fluid mt-5">
                        <h1>Videos List</h1>
                        <button className="btn btn-primary mb-3" onClick={() => navigate("/dashboard/videos/add")}>
                            <i className="bi bi-plus-circle"></i> Add New Video
                        </button>
                        <div className="table-responsive">
                            <table className="table table-striped shadow-sm rounded">
                                <thead style={{ backgroundColor: '#f8f9fa' }}>
                                    <tr>
                                        <th>Title</th>
                                        <th>Thumbnail</th>
                                        <th>User Name</th>
                                        <th>Reward Name</th>
                                        <th>Date Announced</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {videos.map(video => (
                                        <tr key={video.id}>
                                            <td>{video.title}</td>
                                            <td>
                                                {video.thumbnail && (
                                                    <img 
                                                        src={video.thumbnail} 
                                                        alt={video.title} 
                                                        style={{ width: '100px', height: '90px', borderRadius: '5px' }} 
                                                    />
                                                )}
                                            </td>
                                            <td>{video.user ? video.user.name : 'N/A'}</td>
                                            <td>{video.reward ? video.reward.name : 'N/A'}</td>
                                            <td>{video.date_announced ? new Date(video.date_announced).toLocaleDateString() : 'N/A'}</td>
                                            <td>
                                                <span 
                                                    className="text-primary me-2" 
                                                    onClick={() => handleView(video.id)} 
                                                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                                                    <i className="bi bi-eye"/>
                                                </span>
                                                <span 
                                                    className="text-warning me-2" 
                                                    onClick={() => handleEdit(video.id)} 
                                                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                                                    <i className="bi bi-pencil"/>
                                                </span>
                                                <span 
                                                    className="text-danger" 
                                                    onClick={() => handleDelete(video.id)} 
                                                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                                                    <i className="bi bi-trash"/>
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoList;
