
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './ViewVideo.css';

function ViewVideo() {
    const { id } = useParams();
    const [video, setVideo] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/videos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setVideo(response.data);
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();
    }, [id]);

    if (!video) return <div className="loading">Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container mt-5">
                        <div className="video-card shadow-sm p-4 mb-5 bg-white rounded">
                            {video.video && (
                                <video
                                    className="video-element"
                                    controls
                                    poster={video.thumbnail} // Ensure this path is correct
                                >
                                    <source src={video.video} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            <div className="video-title mt-3 text-center">
                                <h1>{video.title}</h1>
                            </div>
                            <div className="video-details mt-3">
                                <p><strong>User Name:</strong> {video.user ? video.user.name : 'N/A'}</p>
                                <p><strong>Reward Name:</strong> {video.reward ? video.reward.name : 'N/A'}</p>
                                <p><strong>Date Announced:</strong> {video.date_announced ? new Date(video.date_announced).toLocaleDateString() : 'N/A'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewVideo;
