

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import Loader from '../../UserSide/Components/LoaderComponent'; // Adjust the import path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../sidebar/Header';

function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/questions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.status === 'Success') {
                    setQuestions(response.data.data); // Adjusted to set the data field directly
                    toast.success(response.data.message);
                } else {
                    toast.error('Failed to fetch questions.');
                }
            } catch (error) {
                console.error('Error fetching questions:', error);
                toast.error(`Error fetching questions: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, []);

    const handleAnswerClick = (id) => {
        navigate(`/dashboard/questions/${id}/answer`);
    };

    const handleEditClick = (id) => {
        navigate(`/dashboard/questions/${id}/edit`);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://3.138.38.248/Enaam_Backend_V1/public/api/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setQuestions(questions.filter((question) => question.id !== id));
            toast.success('Question deleted successfully!');
        } catch (error) {
            console.error('Error deleting question:', error);
            toast.error(`Error deleting question: ${error.response?.data?.message || error.message}`);
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    const filteredQuestions = questions.filter(question =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.options.some(option =>
            option.optionTitle.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12 mt-3'} ms-auto`}>
                    <Header onSidebarToggle={handleSidebarToggle} />
                    <div className="dashboard-content mt-3">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">Questions List</h1>
                            <button
                                className="btn btn-primary shadow-sm"
                                onClick={() => navigate("/dashboard/questions/add")}
                            >
                                <i className="bi bi-plus-circle me-2"></i>Add New Question
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Search questions..."
                            className="form-control mb-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader /> {/* Assuming you have a Loader component */}
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-striped table-bordered shadow-sm rounded">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Question</th>
                                            <th>Option 1</th>
                                            <th>Option 2</th>
                                            <th>Option 3</th>
                                            <th>Option 4</th>
                                            <th>Correct Option</th>
                                            <th className="col-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredQuestions.length ? (
                                            filteredQuestions.map(question => (
                                                <tr key={question.id}>
                                                    <td className='text-truncate' style={{ maxWidth: '100px' }}>{question.title}</td>
                                                    {question.options.map((option, index) => (
                                                        <td key={option.id} className="text-truncate" style={{ maxWidth: '100px' }}>
                                                            {option.optionTitle}
                                                        </td>
                                                    ))}
                                                    <td className="text-truncate" style={{ maxWidth: '100px' }}>
                                                        {question.options.find(option => option.correctOption === 'Y')?.optionTitle || ''}
                                                    </td>
                                                    <td className="text-center">
                                                        <button
                                                            className="btn btn-primary btn-sm me-2"
                                                            onClick={() => handleEditClick(question.id)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm me-2"
                                                            onClick={() => {
                                                                setQuestionToDelete(question.id);
                                                                setShowDeleteModal(true);
                                                            }}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="7" className="text-center">No questions found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this question?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteClick(questionToDelete)}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default QuestionList;
