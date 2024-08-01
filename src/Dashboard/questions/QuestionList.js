
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

function QuestionList() {
    const [questions, setQuestions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/questions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setQuestions(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
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
            await axios.delete(`http://localhost:8000/api/questions/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setQuestions(questions.filter((question) => question.id !== id));
        } catch (error) {
            console.error('Error deleting question:', error);
        }
    };

    return (
        <div className="container-fluid ">
            <div className="row text-start">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container-fluid mt-5">

                        <h1>Questions List</h1>
                        <div className="d-flex justify-content-between mb-4">
                            <div className="add-question-box shadow-sm p-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => navigate("/dashboard/questions/add")}
                                >
                                    <i className="bi bi-plus-lg"></i> Add New Question
                                </button>
                            </div>
                        </div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Question</th>
                                    <th>Option 1</th>
                                    <th>Option 2</th>
                                    <th>Option 3</th>
                                    <th>Correct Option</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {questions.map((question) => (
                                    <tr key={question.id}>
                                        <td>{question.question_text}</td>
                                        <td>{question.option1}</td>
                                        <td>{question.option2}</td>
                                        <td>{question.option3}</td>
                                        <td>{question.right_option}</td>
                                        <td className="d-flex">
                                            <button
                                                className="btn btn-link p-0 me-2"
                                                onClick={() => handleAnswerClick(question.id)}
                                            >
                                                <i className="bi bi-chat-dots"></i> {/* Answer icon */}
                                            </button>
                                            <button
                                                className="btn btn-link p-0 me-2"
                                                onClick={() => handleEditClick(question.id)}
                                            >
                                                <i className="bi bi-pencil-square"></i> {/* Edit icon */}
                                            </button>
                                            <button
                                                className="btn btn-link p-0 text-danger"
                                                onClick={() => handleDeleteClick(question.id)}
                                            >
                                                <i className="bi bi-trash"></i> {/* Delete icon */}
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

    );
}

export default QuestionList;
