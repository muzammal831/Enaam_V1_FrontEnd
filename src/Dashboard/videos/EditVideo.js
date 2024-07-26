// // src/components/videos/EditVideo.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

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

//             navigate('/videos');
//         } catch (error) {
//             console.error('Error updating video:', error);
//         }
//     };

//     if (!video) return <div>Loading...</div>;

//     return (
//         <div className="container mt-5">
//             <h1>Edit Video</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label">Title</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="title"
//                         value={formData.title}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Thumbnail</label>
//                     <input
//                         type="file"
//                         className="form-control"
//                         name="thumbnail"
//                         onChange={handleChange}
//                     />
//                     {video.thumbnail && (
//                         <img
//                             src={`http://localhost:8000/storage/video_thumbnails/${video.thumbnail}`}
//                             alt="Video Thumbnail"
//                             width="100"
//                             className="mt-2"
//                         />
//                     )}
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Video</label>
//                     <input
//                         type="file"
//                         className="form-control"
//                         name="video"
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Update Video</button>
//             </form>
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
    });

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/videos/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setVideo(response.data);
                setFormData({
                    title: response.data.title,
                    thumbnail: null, // We don't prefill this with the existing thumbnail
                    video: null, // We don't prefill this with the existing video
                });
            } catch (error) {
                console.error('Error fetching video:', error);
            }
        };

        fetchVideo();
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

            navigate('/videos');
        } catch (error) {
            console.error('Error updating video:', error);
        }
    };

    if (!video) return <div>Loading...</div>;

    return (
        <div className="d-flex">
            <Sidebar /> {/* Add the Sidebar */}
            <div className="container mt-5 ms-5">
                <h1>Edit Video</h1>
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
                        <label className="form-label">Thumbnail</label>
                        <input
                            type="file"
                            className="form-control"
                            name="thumbnail"
                            onChange={handleChange}
                        />
                        {video.thumbnail && (
                            <img
                                src={`http://localhost:8000/storage/video_thumbnails/${video.thumbnail}`}
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
                    <button type="submit" className="btn btn-primary">Update Video</button>
                </form>
            </div>
        </div>
    );
}

export default EditVideo;
