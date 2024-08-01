import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function AnswerQuestion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState('');

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/questions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setQuestion(response.data);
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (question) {
            setResult(selectedOption === question.right_option ? 'Correct!' : 'Wrong answer!');
            // Redirect back to the question list after a short delay
            setTimeout(() => {
                navigate('/dashboard/questions');
            }, 2000); // Adjust the delay time as needed
        }
    };

    if (!question) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h1>Answer Question</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">{question.question_text}</label>
                </div>
                <div className="form-check mb-3">
                    <input 
                        type="radio" 
                        name="option" 
                        id="option1" 
                        value={question.option1} 
                        className="form-check-input" 
                        onChange={(e) => setSelectedOption(e.target.value)} 
                    />
                    <label className="form-check-label" htmlFor="option1">
                        {question.option1}
                    </label>
                </div>
                <div className="form-check mb-3">
                    <input 
                        type="radio" 
                        name="option" 
                        id="option2" 
                        value={question.option2} 
                        className="form-check-input" 
                        onChange={(e) => setSelectedOption(e.target.value)} 
                    />
                    <label className="form-check-label" htmlFor="option2">
                        {question.option2}
                    </label>
                </div>
                <div className="form-check mb-3">
                    <input 
                        type="radio" 
                        name="option" 
                        id="option3" 
                        value={question.option3} 
                        className="form-check-input" 
                        onChange={(e) => setSelectedOption(e.target.value)} 
                    />
                    <label className="form-check-label" htmlFor="option3">
                        {question.option3}
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                {result && <div className="mt-3">{result}</div>}
            </form>
        </div>
    );
}

export default AnswerQuestion;
