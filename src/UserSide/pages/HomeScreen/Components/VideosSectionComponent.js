

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Loader from '../../../Components/LoaderComponent';
import './RecentLuckyDraws.css'; // Ensure this CSS file is imported

const RecentLuckyDraws = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(true);

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
        setIsPaused(true); // Pause when changing slides
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
        setIsPaused(true); // Pause when changing slides
    };

    const handleThumbnailClick = () => {
        setIsPaused(false); // Play video on thumbnail click
    };

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
                setLoading(false);
            } catch (error) {
                console.error('Error fetching videos:', error);
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) return <Loader />;

    return (
        <section className="image-with-content py-5 video-section">
            <div className="container-fluid col-lg-10 p-5">
                <div className="row align-items-center video-bg hide-on-mobile">
                    <div className="col-lg-12 content-sec-1">
                        <h4 className="title-style mb-3 text-center">Recent Lucky Draws</h4>
                    </div>
                    <div className="col-lg-12 mt-5">
                        <div className="carousel slide" id="carouselExampleIndicators" data-ride="carousel">
                            <div className="carousel-inner">
                                {videos.length > 0 ? (
                                    videos.map((video, index) => (
                                        <div
                                            key={index}
                                            className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                                        >
                                            {index === activeIndex && (
                                                <div className="video-container p-3 transparent-background">
                                                    {video.video && (
                                                        <video
                                                            className="w-50"
                                                            controls
                                                            style={{ height: 'auto' }}
                                                            poster={video.thumbnail} // Ensure this path is correct
                                                        >
                                                            <source src={video.video} type="video/mp4" />
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    )}
                                                    <div className="video-details mt-3 text-center">
                                                        <p><strong>User Name:</strong> {video.user ? video.user.name : 'N/A'}</p>
                                                        <p><strong>Reward Name:</strong> {video.reward ? video.reward.name : 'N/A'}</p>
                                                        <p><strong>Date Announced:</strong> {video.date_announced ? new Date(video.date_announced).toLocaleDateString() : 'N/A'}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <div className="carousel-item active">
                                        <div className="video-container p-3 transparent-background text-center">
                                            <p>No videos available</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#carouselExampleIndicators"
                                role="button"
                                data-slide="prev"
                                onClick={handlePrevClick}
                            >
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#carouselExampleIndicators"
                                role="button"
                                data-slide="next"
                                onClick={handleNextClick}
                            >
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default RecentLuckyDraws;
