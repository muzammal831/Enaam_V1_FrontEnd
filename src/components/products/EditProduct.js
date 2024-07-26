

//     import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

// function EditProduct() {
//     const { id } = useParams();
//     const [formData, setFormData] = useState({
//         name: '',
//         price: '',
//         quantity: '',
//         description: '',
//         draw_date: '',
//         reward_id: '',
//     });
//     const [image, setImage] = useState(null);
//     const [rewards, setRewards] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchProduct = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/admin/products/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setFormData(response.data);
//             } catch (error) {
//                 console.error('Error fetching product:', error);
//             }
//         };

//         const fetchRewards = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/admin/rewards', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setRewards(response.data);
//             } catch (error) {
//                 console.error('Error fetching rewards:', error);
//             }
//         };

//         fetchProduct();
//         fetchRewards();
//     }, [id]);

//     const handleChange = (e) => {
//         setFormData({
//             ...formData,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const handleImageChange = (e) => {
//         setImage(e.target.files[0]);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:8000/api/admin/products/${id}`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     'Content-Type': 'application/json',
//                 },
//             });

//             if (image) {
//                 const formDataImage = new FormData();
//                 formDataImage.append('image', image);
//                 await axios.post(`http://localhost:8000/api/admin/products/${id}/upload-image`, formDataImage, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                         'Content-Type': 'multipart/form-data',
//                     },
//                 });
//             }

//             navigate('/admin/products');
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
//                         <h1>Edit Product</h1>
//                         <form onSubmit={handleSubmit}>
//                             {/* Form fields */}
//                             <div className="mb-3">
//                                 <label htmlFor="name" className="form-label">Name</label>
//                                 <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="price" className="form-label">Price</label>
//                                 <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="quantity" className="form-label">Quantity</label>
//                                 <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="description" className="form-label">Description</label>
//                                 <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="draw_date" className="form-label">Draw Date</label>
//                                 <input type="date" className="form-control" id="draw_date" name="draw_date" value={formData.draw_date} onChange={handleChange} />
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="reward_id" className="form-label">Reward</label>
//                                 <select className="form-control" id="reward_id" name="reward_id" value={formData.reward_id} onChange={handleChange} required>
//                                     <option value="">Select Reward</option>
//                                     {rewards.map((reward) => (
//                                         <option key={reward.id} value={reward.id}>
//                                             {reward.name}
//                                         </option>
//                                     ))}
//                                 </select>
//                             </div>
//                             <div className="mb-3">
//                                 <label htmlFor="image" className="form-label">Image</label>
//                                 <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
//                             </div>
//                             <button type="submit" className="btn btn-primary">Save Changes</button>
//                         </form>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default EditProduct;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

function EditProduct() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        quantity: '',
        description: '',
        draw_date: '',
        reward_id: '',
    });
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [rewards, setRewards] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/admin/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setFormData(response.data);
                // Set the current image URL for preview
                if (response.data.image_url) {
                    setImagePreview(response.data.image_url);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/rewards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setRewards(response.data);
            } catch (error) {
                console.error('Error fetching rewards:', error);
            }
        };

        fetchProduct();
        fetchRewards();
    }, [id]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);

        // Create a URL for the selected image to display a preview
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/admin/products/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });

            if (image) {
                const formDataImage = new FormData();
                formDataImage.append('image', image);
                await axios.post(`http://localhost:8000/api/admin/products/${id}/upload-image`, formDataImage, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'multipart/form-data',
                    },
                });
            }

            navigate('/admin/products');
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
                        <h1>Edit Product</h1>
                        <form onSubmit={handleSubmit}>
                            {/* Form fields */}
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input type="number" className="form-control" id="price" name="price" value={formData.price} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Quantity</label>
                                <input type="number" className="form-control" id="quantity" name="quantity" value={formData.quantity} onChange={handleChange} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea className="form-control" id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="draw_date" className="form-label">Draw Date</label>
                                <input type="date" className="form-control" id="draw_date" name="draw_date" value={formData.draw_date} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="reward_id" className="form-label">Reward</label>
                                <select className="form-control" id="reward_id" name="reward_id" value={formData.reward_id} onChange={handleChange} required>
                                    <option value="">Select Reward</option>
                                    {rewards.map((reward) => (
                                        <option key={reward.id} value={reward.id}>
                                            {reward.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" className="form-control" id="image" name="image" onChange={handleImageChange} />
                                {imagePreview && (
                                    <div className="mt-3">
                                        <img src={imagePreview} alt="Image preview" style={{ width: '200px', height: 'auto' }} />
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditProduct;
