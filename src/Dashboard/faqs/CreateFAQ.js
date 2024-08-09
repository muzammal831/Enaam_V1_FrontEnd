
    import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function CreateFAQ() {
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true before starting submission
        try {
            await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/faqs', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('FAQ created successfully!');
            navigate('/dashboard/faqs');
        } catch (error) {
            console.error('Error creating FAQ:', error.response ? error.response.data : error.message);
            toast.error(`Error: ${error.response ? error.response.data.message : 'Failed to create FAQ.'}`);
        } finally {
            setLoading(false); // Set loading to false after submission
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="container-fluid p-5 mt-5">
                        <div className="p-4 bg-light rounded shadow-sm">
                            {loading ? (
                                <div className="d-flex justify-content-center">
                                    <Loader /> {/* Show loader while loading */}
                                </div>
                            ) : (
                                <div>
                                    <h1 className="mb-4 fs-4 fw-bold text-dark">Create FAQ</h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">Question</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="question"
                                                value={formData.question}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">Answer</label>
                                            <textarea
                                                className="form-control"
                                                name="answer"
                                                value={formData.answer}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <button type="submit" className="btn btn-primary shadow-sm">
                                            Create FAQ
                                        </button>
                                    </form>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default CreateFAQ;
