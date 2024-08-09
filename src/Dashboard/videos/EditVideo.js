


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditVideo.css'; // Import the CSS file for styling
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

function EditVideo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [video, setVideo] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        thumbnail: null,
        video: null,
        user_id: '',
        reward_id: '',
        ticket_name: '',
        date_announced: '',
        video_url: '',
    });
    const [users, setUsers] = useState([]);
    const [rewards, setRewards] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(true); // Loading state
    const [youTubeID, setYouTubeID] = useState('');

    useEffect(() => {
        const fetchVideo = async () => {
            setLoading(true); // Set loading to true before starting fetch
            try {
                const videoResponse = await axios.get(`http://localhost:8000/api/videos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setVideo(videoResponse.data);
                setFormData({
                    title: videoResponse.data.title,
                    thumbnail: null, // We don't prefill this with the existing thumbnail
                    video: null, // We don't prefill this with the existing video
                    user_id: videoResponse.data.user_id,
                    reward_id: videoResponse.data.reward_id,
                    ticket_name: videoResponse.data.ticket_name,
                    date_announced: videoResponse.data.date_announced,
                    video_url: videoResponse.data.video_url,
                });
                const ytID = extractYouTubeID(videoResponse.data.video_url);
                setYouTubeID(ytID);
            } catch (error) {
                console.error('Error fetching video:', error);
                toast.error('Error fetching video.');
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        const fetchUsersAndRewards = async () => {
            try {
                const [usersResponse, rewardsResponse] = await Promise.all([
                    axios.get('http://localhost:8000/api/users', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }),
                    axios.get('http://localhost:8000/api/rewards', {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                    }),
                ]);
                setUsers(usersResponse.data || []); // Ensure users is an array
                setRewards(rewardsResponse.data.rewards || []); // Ensure rewards is an array
            } catch (error) {
                console.error('Error fetching users or rewards:', error);
                toast.error('Error fetching users or rewards.');
            }
        };

        fetchVideo();
        fetchUsersAndRewards();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
        if (name === 'video_url') {
            const ytID = extractYouTubeID(value);
            setYouTubeID(ytID);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true before starting submission

        try {
            await axios.put(`http://localhost:8000/api/videos/${id}`, {
                title: formData.title,
                user_id: formData.user_id,
                reward_id: formData.reward_id,
                ticket_name: formData.ticket_name,
                date_announced: formData.date_announced,
                video_url: formData.video_url,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (formData.thumbnail) {
                const thumbnailFormData = new FormData();
                thumbnailFormData.append('thumbnail', formData.thumbnail);

                await axios.post(`http://localhost:8000/api/videos/${id}/upload-thumbnail`, thumbnailFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            if (formData.video) {
                const videoFormData = new FormData();
                videoFormData.append('video', formData.video);

                await axios.post(`http://localhost:8000/api/videos/${id}/upload-video`, videoFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            toast.success('Video updated successfully!');
            navigate('/dashboard/videos');
        } catch (error) {
            console.error('Error updating video:', error);
            toast.error('Error updating video.');
        } finally {
            setLoading(false); // Set loading to false after submission
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    const extractYouTubeID = (url) => {
        const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        const match = url.match(regex);
        return match ? match[1] : null;
    };

    if (loading) {
        return (
            <div className="container mt-5 d-flex justify-content-center">
                <Loader /> {/* Show loader while loading */}
            </div>
        );
    }

    if (!video) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <ToastContainer /> {/* Include the ToastContainer */}
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="container-fluid col-11 mt-5 p-5 bg-light rounded shadow-sm">
                        <h1 className="mb-4">Edit Video</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="user_id" className="form-label">User</label>
                                <select
                                    className="form-control"
                                    id="user_id"
                                    name="user_id"
                                    value={formData.user_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a User</option>
                                    {users.map(user => (
                                        <option key={user.id} value={user.id}>
                                            {user.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reward_id" className="form-label">Reward</label>
                                <select
                                    className="form-control"
                                    id="reward_id"
                                    name="reward_id"
                                    value={formData.reward_id}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select a Reward</option>
                                    {rewards.map(reward => (
                                        <option key={reward.id} value={reward.id}>
                                            {reward.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ticket_name" className="form-label">Ticket Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ticket_name"
                                    name="ticket_name"
                                    value={formData.ticket_name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="date_announced" className="form-label">Date Announced</label>
                                <input
                                    type="datetime-local"
                                    className="form-control"
                                    id="date_announced"
                                    name="date_announced"
                                    value={formData.date_announced}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="video_url" className="form-label">Video URL</label>
                                <input
                                    type="url"
                                    className="form-control"
                                    id="video_url"
                                    name="video_url"
                                    value={formData.video_url}
                                    onChange={handleChange}
                                />
                            </div>
                            {youTubeID && (
                                <div className="mb-3">
                                    <label className="form-label">Embedded Video</label>
                                    <iframe
                                        width="560"
                                        height="315"
                                        src={`https://www.youtube.com/embed/${youTubeID}`}
                                        title="YouTube video player"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            )}
                            <div className="mb-3">
                                <label htmlFor="thumbnail" className="form-label">Thumbnail</label>
                                <input
                                
                                    type="file"
                                    className="form-control"
                                    id="thumbnail"
                                    name="thumbnail"
                                    onChange={handleChange}
                                    accept="image/*"
                                />
{video.thumbnail && (
                                    <img
                                        style={{ maxWidth: '20%',height: '70px;', marginTop: '10px' }}
                                        src={video.thumbnail}
                                        alt="Current Thumbnail"
                                    />
                                )}



                                
                            </div>
                            <div className="mb-3">
                                <label htmlFor="video" className="form-label">Video File</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="video"
                                    name="video"
                                    onChange={handleChange}
                                    accept="video/*"
                                />
                                 {video.video && (
                                    <video
                                        style={{ maxWidth: '30%',height: '70px;', marginTop: '10px' }}
                                        controls
                                        src={video.video}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Update Video
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditVideo;
