

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function EditBanner() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [banner, setBanner] = useState(null);
//     const [formData, setFormData] = useState({
//         description: '',
//         product_link: '',
//         platform: 'desktop',
//         image: null,
//     });

//     useEffect(() => {
//         const fetchBanner = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/banners/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setBanner(response.data);
//                 setFormData({
//                     description: response.data.description,
//                     product_link: response.data.product_link,
//                     platform: response.data.platform,
//                     image: null,
//                 });
//             } catch (error) {
//                 console.error('Error fetching banner:', error);
//             }
//         };

//         fetchBanner();
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

//         // Send text fields as JSON
//         const textFields = {
//             description: formData.description,
//             product_link: formData.product_link,
//             platform: formData.platform,
//         };

//         try {
//             await axios.put(`http://localhost:8000/api/banners/${id}`, textFields, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });

//             // Handle image upload separately
//             if (formData.image) {
//                 const imageData = new FormData();
//                 imageData.append('image', formData.image);

//                 await axios.post(`http://localhost:8000/api/banners/${id}/upload-image`, imageData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//             }

//             navigate('/banners');
//         } catch (error) {
//             console.error('Error updating banner:', error);
//         }
//     };

//     if (!banner) return <div>Loading...</div>;

//     return (
//         <div className="container mt-5">
//             <h1>Edit Banner</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label">Description</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Product Link</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="product_link"
//                         value={formData.product_link}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Platform</label>
//                     <select
//                         className="form-select"
//                         name="platform"
//                         value={formData.platform}
//                         onChange={handleChange}
//                     >
//                         <option value="desktop">Desktop</option>
//                         <option value="mobile">Mobile</option>
//                         <option value="mobilead">Mobile Ads</option>
//                         <option value="both">Both</option>
//                     </select>
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Image</label>
//                     <input
//                         type="file"
//                         className="form-control"
//                         name="image"
//                         onChange={handleChange}
//                     />
//                     {banner.image && (
//                         <img
//                             src={`http://localhost:8000/storage/banner_images/${banner.image}`}
//                             alt="Banner"
//                             width="100"
//                             className="mt-2"
//                         />
//                     )}
//                 </div>
//                 <button type="submit" className="btn btn-primary">Update Banner</button>
//             </form>
//         </div>
//     );
// }

// export default EditBanner;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component

function EditBanner() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [banner, setBanner] = useState(null);
    const [formData, setFormData] = useState({
        description: '',
        product_link: '',
        platform: 'desktop',
        image: null,
    });

    useEffect(() => {
        const fetchBanner = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/banners/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBanner(response.data);
                setFormData({
                    description: response.data.description,
                    product_link: response.data.product_link,
                    platform: response.data.platform,
                    image: null,
                });
            } catch (error) {
                console.error('Error fetching banner:', error);
            }
        };

        fetchBanner();
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

        // Send text fields as JSON
        const textFields = {
            description: formData.description,
            product_link: formData.product_link,
            platform: formData.platform,
        };

        try {
            await axios.put(`http://localhost:8000/api/banners/${id}`, textFields, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Handle image upload separately
            if (formData.image) {
                const imageData = new FormData();
                imageData.append('image', formData.image);

                await axios.post(`http://localhost:8000/api/banners/${id}/upload-image`, imageData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            navigate('/banners');
        } catch (error) {
            console.error('Error updating banner:', error);
        }
    };

    if (!banner) return <div>Loading...</div>;

    return (
        <div className="d-flex">
            <Sidebar /> {/* Add the Sidebar */}
            <div className="container mt-5 ms-5">
                <h1>Edit Banner</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Product Link</label>
                        <input
                            type="text"
                            className="form-control"
                            name="product_link"
                            value={formData.product_link}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Platform</label>
                        <select
                            className="form-select"
                            name="platform"
                            value={formData.platform}
                            onChange={handleChange}
                        >
                            <option value="desktop">Desktop</option>
                            <option value="mobile">Mobile</option>
                            <option value="mobilead">Mobile Ads</option>
                            <option value="both">Both</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image</label>
                        <input
                            type="file"
                            className="form-control"
                            name="image"
                            onChange={handleChange}
                        />
                        {banner.image && (
                            <img
                                src={`http://localhost:8000/storage/banner_images/${banner.image}`}
                                alt="Banner"
                                width="100"
                                className="mt-2"
                            />
                        )}
                    </div>
                    <button type="submit" className="btn btn-primary">Update Banner</button>
                </form>
            </div>
        </div>
    );
}

export default EditBanner;
