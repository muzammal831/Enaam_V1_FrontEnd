// // src/components/banners/AddBanner.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function AddBanner() {
//     const navigate = useNavigate();
//     const [formData, setFormData] = useState({
//         description: '',
//         product_link: '',
//         platform: 'desktop',
//         image: null,
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
//         const data = new FormData();
//         data.append('description', formData.description);
//         data.append('product_link', formData.product_link);
//         data.append('platform', formData.platform);
//         data.append('image', formData.image);

//         try {
//             await axios.post('http://localhost:8000/api/banners', data, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             navigate('/banners');
//         } catch (error) {
//             console.error('Error adding banner:', error);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h1>Add Banner</h1>
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
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Add Banner</button>
//             </form>
//         </div>
//     );
// }

// export default AddBanner;

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component
import './AddBanner.css'; // Import the CSS file for styling

function AddBanner() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        description: '',
        product_link: '',
        platform: 'desktop',
        image: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('description', formData.description);
        data.append('product_link', formData.product_link);
        data.append('platform', formData.platform);
        data.append('image', formData.image);

        try {
            await axios.post('http://localhost:8000/api/banners', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate('/banners');
        } catch (error) {
            console.error('Error adding banner:', error);
        }
    };

    return (
        <div className="d-flex">
            <Sidebar /> {/* Add the Sidebar */}
            <div className="container mt-5 ms-5">
                <h1>Add Banner</h1>
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
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Banner</button>
                </form>
            </div>
        </div>
    );
}

export default AddBanner;
