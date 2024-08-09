

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Adjust the import path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FAQList() {
    const [faqs, setFaqs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [faqToDelete, setFaqToDelete] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/faqs', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setFaqs(response.data);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
                toast.error(`Error fetching FAQs: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };

        fetchFaqs();
    }, []);

    const handleEditClick = (id) => {
        navigate(`/dashboard/faqs/${id}/edit`);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://3.138.38.248/Enaam_Backend_V1/public/api/faqs/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setFaqs(faqs.filter(faq => faq.id !== id));
            toast.success('FAQ deleted successfully!');
        } catch (error) {
            console.error('Error deleting FAQ:', error);
            toast.error(`Error deleting FAQ: ${error.response?.data?.message || error.message}`);
        } finally {
            setShowDeleteModal(false);
        }
    };

    const handleAddClick = () => {
        navigate("/dashboard/faqs/create");
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">FAQ List</h1>
                            <button
                                className="btn btn-primary shadow-sm"
                                onClick={handleAddClick}
                            >
                                <i className="bi bi-plus-circle me-2"></i>Add New FAQ
                            </button>
                        </div>

                        <input
                            type="text"
                            placeholder="Search FAQs..."
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
                                            <th>Answer</th>
                                            <th className="col-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredFaqs.length ? (
                                            filteredFaqs.map(faq => (
                                                <tr key={faq.id}>
                                                    <td className='text-truncate' style={{ maxWidth: '300px' }}>{faq.question}</td>
                                                    <td className='text-truncate' style={{ maxWidth: '300px' }}>{faq.answer}</td>
                                                    <td className="text-center">
                                                        <button
                                                            className="btn btn-primary btn-sm me-2"
                                                            onClick={() => handleEditClick(faq.id)}
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </button>
                                                        <button
                                                            className="btn btn-danger btn-sm me-2"
                                                            onClick={() => {
                                                                setFaqToDelete(faq.id);
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
                                                <td colSpan="3" className="text-center">No FAQs found</td>
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
                                <p>Are you sure you want to delete this FAQ?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={() => handleDeleteClick(faqToDelete)}>
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

export default FAQList;
