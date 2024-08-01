// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

// function AddVideo() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         title: '',
//         thumbnail: null,
//         video: null,
//     });

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
//             const response = await axios.post('http://localhost:8000/api/videos', {
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

//                 await axios.post(`http://localhost:8000/api/videos/${response.data.id}/upload-thumbnail`, thumbnailFormData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//             }

//             if (formData.video) {
//                 const videoFormData = new FormData();
//                 videoFormData.append('video', formData.video);

//                 await axios.post(`http://localhost:8000/api/videos/${response.data.id}/upload-video`, videoFormData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//             }

//             navigate('/dashboard/videos');
//         } catch (error) {
//             console.error('Error adding video:', error);
//         }
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-2">
//                     <Sidebar />
//                 </div>
//                 <div className="col-md-10">
//                     <div className="container mt-5">
//                         <h1>Add Video</h1>
//                         <form onSubmit={handleSubmit}>
//                             <div className="mb-3">
//                                 <label className="form-label">Title</label>
//                                 <input
//                                     type="text"
//                                     className="form-control"
//                                     name="title"
//                                     value={formData.title}
//                                     onChange={handleChange}
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Thumbnail</label>
//                                 <input
//                                     type="file"
//                                     className="form-control"
//                                     name="thumbnail"
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Video</label>
//                                 <input
//                                     type="file"
//                                     className="form-control"
//                                     name="video"
//                                     onChange={handleChange}
//                                 />
//                             </div>
//                             <button type="submit" className="btn btn-primary">Add Video</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default AddVideo;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function AddVideo() {
    const navigate = useNavigate();
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

        fetchUsersAndRewards();
    }, []);

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
            const response = await axios.post('http://localhost:8000/api/videos', {
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

                await axios.post(`http://localhost:8000/api/videos/${response.data.id}/upload-thumbnail`, thumbnailFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            if (formData.video) {
                const videoFormData = new FormData();
                videoFormData.append('video', formData.video);

                await axios.post(`http://localhost:8000/api/videos/${response.data.id}/upload-video`, videoFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            navigate('/dashboard/videos');
        } catch (error) {
            console.error('Error adding video:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container mt-5">
                        <h1>Add Video</h1>
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
                            <button type="submit" className="btn btn-primary btn-sm">Add Video</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddVideo;
