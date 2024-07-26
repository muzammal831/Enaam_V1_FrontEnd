import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function CreateAboutUs() {
    const [formData, setFormData] = useState({
        heading: '',
        about_detail: '',
        about_image: null,
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('heading', formData.heading);
        form.append('about_detail', formData.about_detail);
        if (formData.about_image) {
            form.append('about_image', formData.about_image);
        }

        try {
            await axios.post('http://localhost:8000/api/about-us', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate('/about-us');
        } catch (error) {
            console.error('Error creating About Us data:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h1>Create About Us</h1>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => navigate('/about-us')}
                                    >
                                        <i className="bi bi-arrow-left"></i> Back to List
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
                                    </div>
                                    <button type="submit" className="btn btn-primary bi bi-plus">
                                       Create
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

export default CreateAboutUs;
