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
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <h1>Videos List</h1>
                        <button className="btn btn-primary mb-3" onClick={() => navigate("/dashboard/videos/add")}>
                            <i className="bi bi-plus-circle"></i> Add New Video
                        </button>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {videos.map(video => (
                                    <tr key={video.id}>
                                        <td>{video.title}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleView(video.id)}>
                                                <i className="bi bi-eye"></i> View
                                            </button>
                                            <button className="btn btn-secondary mx-2" onClick={() => handleEdit(video.id)}>
                                                <i className="bi bi-pencil"></i> Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(video.id)}>
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoList;
