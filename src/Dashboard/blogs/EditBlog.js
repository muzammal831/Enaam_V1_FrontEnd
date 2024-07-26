// // src/components/blogs/EditBlog.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function EditBlog() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [blog, setBlog] = useState(null);
//     const [formData, setFormData] = useState({
//         heading: '',
//         description: '',
//         blog_image: null,
//     });

//     useEffect(() => {
//         const fetchBlog = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/blogs/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setBlog(response.data);
//                 setFormData({
//                     heading: response.data.heading,
//                     description: response.data.description,
//                     blog_image: null, // We don't prefill this with the existing image
//                 });
//             } catch (error) {
//                 console.error('Error fetching blog:', error);
//             }
//         };

//         fetchBlog();
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
//             await axios.put(`http://localhost:8000/api/blogs/${id}`, {
//                 heading: formData.heading,
//                 description: formData.description,
//             }, {
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });

//             if (formData.blog_image) {
//                 const fileFormData = new FormData();
//                 fileFormData.append('blog_image', formData.blog_image);

//                 await axios.post(`http://localhost:8000/api/blogs/${id}/upload-image`, fileFormData, {
//                     headers: {
//                         'Content-Type': 'multipart/form-data',
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//             }

//             navigate('/blogs');
//         } catch (error) {
//             console.error('Error updating blog:', error);
//         }
//     };

//     if (!blog) return <div>Loading...</div>;

//     return (
//         <div className="container mt-5">
//             <h1>Edit Blog</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label">Heading</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="heading"
//                         value={formData.heading}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Description</label>
//                     <textarea
//                         className="form-control"
//                         name="description"
//                         value={formData.description}
//                         onChange={handleChange}
//                         required
//                     ></textarea>
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Blog Image</label>
//                     <input
//                         type="file"
//                         className="form-control"
//                         name="blog_image"
//                         onChange={handleChange}
//                     />
//                     {blog.blog_image && (
//                         <img
//                             src={`http://localhost:8000/storage/blog_images/${blog.blog_image}`}
//                             alt="Blog"
//                             width="100"
//                             className="mt-2"
//                         />
//                     )}
//                 </div>
//                 <button type="submit" className="btn btn-primary">Update Blog</button>
//             </form>
//         </div>
//     );
// }

// export default EditBlog;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [formData, setFormData] = useState({
        heading: '',
        description: '',
        blog_image: null,
    });

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBlog(response.data);
                setFormData({
                    heading: response.data.heading,
                    description: response.data.description,
                    blog_image: null, // We don't prefill this with the existing image
                });
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
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
            await axios.put(`http://localhost:8000/api/blogs/${id}`, {
                heading: formData.heading,
                description: formData.description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            if (formData.blog_image) {
                const fileFormData = new FormData();
                fileFormData.append('blog_image', formData.blog_image);

                await axios.post(`http://localhost:8000/api/blogs/${id}/upload-image`, fileFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            navigate('/blogs');
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <h1>Edit Blog</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Heading</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="heading"
                                    value={formData.heading}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Blog Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    name="blog_image"
                                    onChange={handleChange}
                                />
                                {blog.blog_image && (
                                    <img
                                        src={`http://localhost:8000/storage/blog_images/${blog.blog_image}`}
                                        alt="Blog"
                                        width="100"
                                        className="mt-2"
                                    />
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-save"></i> Update Blog
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditBlog;
