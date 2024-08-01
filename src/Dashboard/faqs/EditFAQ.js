
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function EditFAQ() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [faq, setFaq] = useState(null);
    const [formData, setFormData] = useState({
        question: '',
        answer: '',
    });

    useEffect(() => {
        const fetchFAQ = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/faqs/${id}`, {
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
            await axios.put(`http://localhost:8000/api/faqs/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate('/dashboard/faqs');
        } catch (error) {
            console.error('Error updating FAQ:', error);
        }
    };

    if (!faq) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container mt-5">
                        <div className="card shadow-sm">
                            <div className="card-header">
                                <h1>Edit FAQ</h1>
                            </div>
                            <div className="card-body">
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
                                    <button type="submit" className="btn btn-primary">
                                        Update FAQ
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

export default EditFAQ;
