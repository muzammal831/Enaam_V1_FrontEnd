// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

// function RewardEdit() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [name, setName] = useState('');
//     const [image, setImage] = useState(null);
//     const [description, setDescription] = useState('');
//     const [currentImage, setCurrentImage] = useState('');

//     useEffect(() => {
//         const fetchReward = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/admin/rewards/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 console.log('Fetched Reward:', response.data); // Log fetched reward data
//                 setName(response.data.name);
//                 setDescription(response.data.description);
//                 setCurrentImage(response.data.image_url); // Assuming `image_url` is the field for the current image
//             } catch (error) {
//                 console.error('Fetch Error:', error.response ? error.response.data : error.message);
//             }
//         };

//         fetchReward();
//     }, [id]);

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         const formData = new FormData();
//         formData.append('name', name);
//         formData.append('description', description);
//         if (image) formData.append('image', image);
    
//         // Log FormData contents
//         for (let pair of formData.entries()) {
//             console.log(`${pair[0]}: ${pair[1]}`);
//         }
    
//         try {
//             const response = await axios.put(`http://localhost:8000/api/admin/rewards/${id}`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'multipart/form-data'
//                 }
//             });
//             console.log('Update Response:', response.data);
//         } catch (error) {
//             console.error('Error:', error.response ? error.response.data : error.message);
//         }
//     };
    

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-3">
//                     <Sidebar /> {/* Add Sidebar */}
//                 </div>
//                 <div className="col-md-9">
//                     <div className="container mt-5">
//                         <h1 className="mb-4">Edit Reward</h1>
//                         <form onSubmit={handleUpdate}>
//                             <div className="mb-3">
//                                 <label className="form-label">Name</label>
//                                 <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Image</label>
//                                 {currentImage && (
//                                     <div className="mb-3">
//                                         <img src={`http://localhost:8000${currentImage}`} alt="Current Reward" style={{ width: '200px', height: 'auto' }} className="mb-3" />
//                                     </div>
//                                 )}
//                                 <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
//                             </div>
//                             <div className="mb-3">
//                                 <label className="form-label">Description</label>
//                                 <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
//                             </div>
//                             <button type="submit" className="btn btn-primary">Update Reward</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default RewardEdit;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

function RewardEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        const fetchReward = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/admin/rewards/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setName(response.data.name);
                setDescription(response.data.description);
                setCurrentImage(response.data.image_url); // Assuming `image_url` is the field for the current image
            } catch (error) {
                console.error(error);
            }
        };

        fetchReward();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();

        // Prepare text data
        const textData = {
            name,
            description,
        };

        // Handle file upload
        const formData = new FormData();
        formData.append('image', image);

        try {
            // First update text fields
            await axios.put(`http://localhost:8000/api/admin/rewards/${id}`, textData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });

            // Then upload file if exists
            if (image) {
                await axios.post(`http://localhost:8000/api/admin/rewards/${id}/upload`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            navigate('/admin/rewards'); // Redirect after successful update
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar /> {/* Add Sidebar */}
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <h1 className="mb-4">Edit Reward</h1>
                        <form onSubmit={handleUpdate}>
                            <div className="mb-3">
                                <label className="form-label">Name</label>
                                <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Image</label>
                                {currentImage && (
                                    <div className="mb-3">
                                        <img src={`http://localhost:8000${currentImage}`} alt="Current Reward" style={{ width: '200px', height: 'auto' }} className="mb-3" />
                                    </div>
                                )}
                                <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Update Reward</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RewardEdit;
