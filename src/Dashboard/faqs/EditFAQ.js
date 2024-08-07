

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function EditFAQ() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [faq, setFaq] = useState(null);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchFAQ = async () => {
            setLoading(true); // Set loading to true before starting fetch
            try {
                const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/faqs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setFaq(response.data);
                setFormData({
                    question: response.data.question,
                    answer: response.data.answer,
                });
            } catch (error) {
                console.error('Error fetching FAQ:', error);
                toast.error('Failed to fetch FAQ.');
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchFAQ();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://3.138.38.248/Enaam_Backend_V1/public/api/faqs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('FAQ updated successfully!');
            navigate('/dashboard/faqs');
        } catch (error) {
            console.error('Error updating FAQ:', error);
            toast.error('Failed to update FAQ.');
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

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="container-fluid col-11 mt-5 p-5 bg-light rounded shadow-sm ">
                        <h1 className="mb-4">Edit FAQ</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="question" className="form-label">Question</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question"
                                    name="question"
                                    value={formData.question}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="answer" className="form-label">Answer</label>
                                <textarea
                                    className="form-control"
                                    id="answer"
                                    name="answer"
                                    value={formData.answer}
                                    onChange={handleChange}
                                    required
                                ></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Update FAQ</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default EditFAQ;
