// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
// import './ViewVideo.css'; // Import the CSS file for styling

// function ViewVideo() {
//     const { id } = useParams();
//     const [video, setVideo] = useState(null);

//     useEffect(() => {
//         const fetchVideo = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/videos/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setVideo(response.data);
//             } catch (error) {
//                 console.error('Error fetching video:', error);
//             }
//         };

//         fetchVideo();
//     }, [id]);

//     if (!video) return <div>Loading...</div>;

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-3">
//                     <Sidebar />
//                 </div>
//                 <div className="col-md-9">
//                     <div className="container mt-5">
//                         <div className="video-wrapper">
//                             {video.video && (
//                                 <video
//                                     width="100%"
//                                     height="auto"
//                                     controls
//                                     poster={`http://localhost:8000/storage/video_thumbnails/${video.thumbnail}`} // Set the poster attribute
//                                 >
//                                     <source src={`http://localhost:8000/storage/videos/${video.video}`} type="video/mp4" />
//                                     Your browser does not support the video tag.
//                                 </video>
//                             )}
//                             <div className="video-title mt-3">
//                                 <h1>{video.title}</h1>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default ViewVideo;

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

    if (!video) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <div className="video-wrapper">
                            {video.video && (
                                <video
                                    width="100%"
                                    height="auto"
                                    controls
                                    poster={`http://localhost:8000/storage/video_thumbnails/${video.thumbnail}`} // Ensure this path is correct
                                >
                                    <source src={`http://localhost:8000/storage/videos/${video.video}`} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            )}
                            <div className="video-title mt-3">
                                <h1>{video.title}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewVideo;
