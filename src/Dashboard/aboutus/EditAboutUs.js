import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function EditAboutUs() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [aboutUs, setAboutUs] = useState(null);
    const [formData, setFormData] = useState({
        heading: '',
        about_detail: '',
        about_image: null,
    });

    useEffect(() => {
        const fetchAboutUs = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/about-us/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setAboutUs(response.data);
                setFormData({
                    heading: response.data.heading,
                    about_detail: response.data.about_detail,
                    about_image: null, // We don't prefill this with the existing image
                });
            } catch (error) {
                console.error('Error fetching About Us data:', error);
            }
        };

        fetchAboutUs();
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
            // Send JSON payload for text fields
            await axios.put(`http://localhost:8000/api/about-us/${id}`, {
                heading: formData.heading,
                about_detail: formData.about_detail,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Handle file upload separately if there's an image
            if (formData.about_image) {
                const fileFormData = new FormData();
                fileFormData.append('about_image', formData.about_image);

                await axios.post(`http://localhost:8000/api/about-us/${id}/upload-image`, fileFormData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
            }

            navigate('/dashboard/about-us');
        } catch (error) {
            console.error('Error updating About Us data:', error);
        }
    };

    if (!aboutUs) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container mt-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h1>Edit About Us</h1>
                                    <button
                                        className="btn btn-secondary bi bi-arrow-left"
                                        onClick={() => navigate('/dashboard/about-us')}
                                    >
                                         Back to List
                                    </button>
                                </div>
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
                                        <label className="form-label">About Detail</label>
                                        <textarea
                                            className="form-control"
                                            name="about_detail"
                                            value={formData.about_detail}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">About Image</label>
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="about_image"
                                            onChange={handleChange}
                                        />
                                        {aboutUs.about_image && (
                                            <img
                                                src={aboutUs.about_image}
                                                alt="About Us"
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
                </div>
            </div>
        </div>
    );
}

export default EditAboutUs;
