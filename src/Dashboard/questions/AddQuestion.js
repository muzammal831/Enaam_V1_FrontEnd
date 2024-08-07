

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component
import './AddQuestion.css'; // Import CSS for styling

function AddQuestion() {
    const [formData, setFormData] = useState({
        question_text: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '', // Add option4 to state
        right_option: '',
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(false); // Add loading state
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true before starting submission
        try {
            await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/questions', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            toast.success('Question added successfully!');
            navigate('/dashboard/questions');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            toast.error(`Error: ${error.response ? error.response.data.message : 'Failed to add question.'}`);
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
                                    <h1 className="mb-4 fs-4 fw-bold text-dark">Add New Question</h1>
                                    <form onSubmit={handleSubmit}>
                                        <div className="mb-3">
                                            <label htmlFor="question_text" className="form-label">Question Text</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="question_text"
                                                name="question_text"
                                                value={formData.question_text}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="option1" className="form-label">Option 1</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="option1"
                                                name="option1"
                                                value={formData.option1}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="option2" className="form-label">Option 2</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="option2"
                                                name="option2"
                                                value={formData.option2}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="option3" className="form-label">Option 3</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="option3"
                                                name="option3"
                                                value={formData.option3}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="option4" className="form-label">Option 4</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="option4"
                                                name="option4"
                                                value={formData.option4}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="right_option" className="form-label">Correct Option</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="right_option"
                                                name="right_option"
                                                value={formData.right_option}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary shadow-sm">
                                            Submit
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

export default AddQuestion;
