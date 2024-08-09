

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function EditBlog() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [formData, setFormData] = useState({
        heading: '',
        description: '',
        blog_image: null,
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchBlog = async () => {
            setLoading(true); // Set loading to true before starting fetch
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
                toast.error('Failed to fetch blog.');
            } finally {
                setLoading(false); // Set loading to false after fetch
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
        setLoading(true); // Set loading to true before starting submission

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

            toast.success('Blog updated successfully!');
            navigate('/dashboard/blogs');
        } catch (error) {
            console.error('Error updating blog:', error);
            toast.error('Failed to update blog.');
        } finally {
            setLoading(false); // Set loading to false after submission
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    if (loading) {
        return (
            <div className="container mt-5 d-flex justify-content-center">
                <Loader /> {/* Show loader while loading */}
            </div>
        );
    }

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="container-fluid col-11 mt-5 p-5 bg-light rounded shadow-sm">
                        <h1 className="mb-4">Edit Blog</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="heading" className="form-label">Heading</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="heading"
                                    name="heading"
                                    value={formData.heading}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="blog_image" className="form-label">Blog Image</label>
                                <input
                                    type="file"
                                    className="form-control"
                                    id="blog_image"
                                    name="blog_image"
                                    onChange={handleChange}
                                />
                                {blog.blog_image && (
                                    <img
                                    style={{borderRadius: "10px"}}
                                        src={blog.blog_image}
                                        alt="Blog"
                                        width="100"
                                        className="mt-2"
                                    />
                                )}
                            </div>
                            <button type="submit" className="btn btn-primary bi bi-plus">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default EditBlog;
