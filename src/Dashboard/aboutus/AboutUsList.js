

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function AboutUsList() {
    const [aboutUs, setAboutUs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAboutUs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/about-us', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setAboutUs(response.data);
            } catch (error) {
                console.error('Error fetching About Us data:', error);
            }
        };

        fetchAboutUs();
    }, []);

    const handleEditClick = (id) => {
        navigate(`/dashboard/about-us/${id}/edit`);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/about-us/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setAboutUs(aboutUs.filter(item => item.id !== id));
        } catch (error) {
            console.error('Error deleting About Us data:', error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-4 col-sm-12">
                    <Sidebar />
                </div>
                <div className="col-lg-10 col-md-8 col-sm-12">
                    <div className="container-fluid mt-5">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h1>About Us List</h1>
                                    <button className="btn btn-primary" onClick={() => navigate("/dashboard/about-us/create")}>
                                        <i className="bi bi-plus-circle"></i> Add New
                                    </button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">Heading</th>
                                                <th scope="col">About Detail</th>
                                                <th scope="col">About Image</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {aboutUs.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.heading}</td>
                                                    <td>{item.about_detail}</td>
                                                    <td>
                                                        {item.about_image && (
                                                            <img
                                                                src={item.about_image}
                                                                alt={item.heading}
                                                                width="100"
                                                                className="img-thumbnail"
                                                            />
                                                        )}
                                                    </td>
                                                    <td>
                                                        <button
                                                            className="btn btn-warning me-2 bi bi-pencil-square"
                                                            onClick={() => handleEditClick(item.id)}
                                                        >
                                                        </button>
                                                        <button
                                                            className="btn btn-danger bi bi-trash"
                                                            onClick={() => handleDeleteClick(item.id)}
                                                        >
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AboutUsList;
