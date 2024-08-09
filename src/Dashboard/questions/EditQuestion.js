


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component

function EditQuestion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [formData, setFormData] = useState({
        question_text: '',
        option1: '',
        option2: '',
        option3: '',
        option4: '',
        right_option: '',
    });
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchQuestion = async () => {
            setLoading(true); // Set loading to true before starting fetch
            try {
                const response = await axios.get(`http://localhost:8000/api/questions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setQuestion(response.data);
                setFormData({
                    question_text: response.data.question_text,
                    option1: response.data.option1,
                    option2: response.data.option2,
                    option3: response.data.option3,
                    option4: response.data.option4,
                    right_option: response.data.right_option,
                });
            } catch (error) {
                console.error('Error fetching question:', error);
                toast.error('Failed to fetch question.');
            } finally {
                setLoading(false); // Set loading to false after fetch
            }
        };

        fetchQuestion();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/questions/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            toast.success('Question updated successfully!');
            navigate('/dashboard/questions');
        } catch (error) {
            console.error('Error updating question:', error);
            toast.error('Failed to update question.');
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
                        <h1 className="mb-4">Edit Question</h1>
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
                            <button type="submit" className="btn btn-primary">Update Question</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default EditQuestion;
