// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import './EditVideo.css'; // Import the CSS file for styling
// import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component

// function EditVideo() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [video, setVideo] = useState(null);
//     const [formData, setFormData] = useState({
//         title: '',
//         thumbnail: null,
//         video: null,
//     });

//     useEffect(() => {
//         const fetchVideo = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/videos/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setVideo(response.data);
//                 setFormData({
//                     title: response.data.title,
//                     thumbnail: null, // We don't prefill this with the existing thumbnail
//                     video: null, // We don't prefill this with the existing video
//                 });
//             } catch (error) {
//                 console.error('Error fetching video:', error);
//             }
//         };

//         fetchVideo();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value, files } = e.target;
//         setFormData({
//             ...formData,
//             [name]: files ? files[0] : value,
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             await axios.put(`http://localhost:8000/api/videos/${id}`, {
//                 title: formData.title,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });

//             if (formData.thumbnail) {
//                 const thumbnailFormData = new FormData();
//                 thumbnailFormData.append('thumbnail', formData.thumbnail);

//                 await axios.post(`http://localhost:8000/api/videos/${id}/upload-thumbnail`, thumbnailFormData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//             }

//             if (formData.video) {
//                 const videoFormData = new FormData();
//                 videoFormData.append('video', formData.video);

//                 await axios.post(`http://localhost:8000/api/videos/${id}/upload-video`, videoFormData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//             }

//             navigate('/dashboard/videos');
//         } catch (error) {
//             console.error('Error updating video:', error);
//         }
//     };

//     if (!video) return <div>Loading...</div>;

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-2">
//                     <Sidebar />
//                 </div>
//                 <div className="col-md-10">
//                     <div className="container mt-5">
//                         <div className="edit-video-card shadow-sm p-4 mb-5 bg-white rounded">
//                             <h1 className="text-center mb-4">Edit Video</h1>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-3">
//                                     <label className="form-label">Title</label>
//                                     <input
//                                         type="text"
//                                         className="form-control"
//                                         name="title"
//                                         value={formData.title}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">Thumbnail</label>
//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         name="thumbnail"
//                                         onChange={handleChange}
//                                     />
//                                     {video.thumbnail && (
//                                         <img
//                                             src={video.thumbnail}
//                                             alt="Video Thumbnail"
//                                             className="img-thumbnail-preview"
//                                         />
//                                     )}
//                                 </div>
//                                 <div className="mb-3">
//                                     <label className="form-label">Video</label>
//                                     <input
//                                         type="file"
//                                         className="form-control"
//                                         name="video"
//                                         onChange={handleChange}
//                                     />
//                                 </div>
//                                 <button type="submit" className="btn btn-primary w-25 ">
//                                     Update Video
//                                 </button>
//                             </form>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EditVideo;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './EditVideo.css'; // Import the CSS file for styling
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component

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
    });
    const [users, setUsers] = useState([]);
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        const fetchVideo = async () => {
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
                });
            } catch (error) {
                console.error('Error fetching video:', error);
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
                setUsers(usersResponse.data);
                setRewards(rewardsResponse.data);
            } catch (error) {
                console.error('Error fetching users or rewards:', error);
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
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`http://localhost:8000/api/videos/${id}`, {
                title: formData.title,
                user_id: formData.user_id,
                reward_id: formData.reward_id,
                ticket_name: formData.ticket_name,
                date_announced: formData.date_announced,
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

            navigate('/dashboard/videos');
        } catch (error) {
            console.error('Error updating video:', error);
        }
    };

    if (!video) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container mt-5">
                        <div className="edit-video-card shadow-sm p-4 mb-5 bg-white rounded">
                            <h1 className="text-center mb-4">Edit Video</h1>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Title</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">User</label>
                                    <select
                                        className="form-control"
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
                                    <label className="form-label">Reward</label>
                                    <select
                                        className="form-control"
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
                                    <label className="form-label">Ticket Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="ticket_name"
                                        value={formData.ticket_name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Date Announced</label>
                                    <input
                                        type="datetime-local"
                                        className="form-control"
                                        name="date_announced"
                                        value={formData.date_announced}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Thumbnail</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="thumbnail"
                                        onChange={handleChange}
                                    />
                                    {video.thumbnail && (
                                        <img
                                            src={video.thumbnail}
                                            alt="Video Thumbnail"
                                            className="img-thumbnail-preview"
                                        />
                                    )}
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Video</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        name="video"
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-25">
                                    Update Video
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditVideo;
