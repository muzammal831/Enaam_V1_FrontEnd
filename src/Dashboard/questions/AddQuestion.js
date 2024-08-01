import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './AddQuestion.css'; // Import CSS for styling

function AddQuestion() {
    const [formData, setFormData] = useState({
        question_text: '',
        option1: '',
        option2: '',
        option3: '',
        right_option: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/questions', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            });
            navigate('/dashboard/questions');
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="form-container mt-5">
                        <h1 className="mb-4">Add New Question</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
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
                            <div className="form-group">
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
                            <div className="form-group">
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
                            <div className="form-group">
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
                            <div className="form-group">
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
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddQuestion;
