


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../../../Components/HeaderComponent';
import Footer from '../../../Components/FooterCompnent';
import 'flipclock/dist/flipclock.css';
import FlipClock from 'flipclock';
import './Styles.css';

const Game = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState('');
    const [activeOption, setActiveOption] = useState(null);
    const clockRef = useRef(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/questions');
                setQuestions(response.data);
                selectRandomQuestion(response.data);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };

        fetchQuestions();
    }, []);

    useEffect(() => {
        if (clockRef.current) {
            const clock = new FlipClock(clockRef.current, {
                clockFace: 'HourlyCounter',
                autoStart: false,
                callbacks: {
                    stop: function() {
                        window.location.href = "http://3.138.38.248/Enaam_Backend_V1/public/api/questions";
                    }
                }
            });
            clock.setTime(180);
            clock.setCountdown(true);
            clock.start();
        }
    }, [clockRef]);

    const selectRandomQuestion = (questionsList) => {
        if (questionsList.length > 0) {
            const randomIndex = Math.floor(Math.random() * questionsList.length);
            setCurrentQuestion(questionsList[randomIndex]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (currentQuestion) {
            const isCorrect = selectedOption === currentQuestion.right_option ? 'yes' : 'no';
            setResult(isCorrect === 'yes' ? 'Correct!' : 'Wrong answer!');

            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in local storage
                await axios.post(
                    'http://3.138.38.248/Enaam_Backend_V1/public/api/cart/update-is-correct',
                    { is_correct: isCorrect },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
            } catch (error) {
                console.error('Error updating cart:', error);
            }

            setTimeout(() => {
                selectRandomQuestion(questions);
                setSelectedOption('');
                setResult('');
                setActiveOption(null);
            }, 2000);
        }
    };

    const handleOptionClick = (optionValue) => {
        setSelectedOption(optionValue);
        setActiveOption(optionValue);
    };

    if (!currentQuestion) return <div>Loading...</div>;

    return (
        <div className="App">
            <Header />
            <div className="container-fluid col-lg-10 mt-5 p-5">
                <h1 className="text-center">Answer Question</h1>
                <div className="row">
                    <div className="col-md-4 question-section">
                        <div className="clock" ref={clockRef} style={{ marginTop: '-15px' }}></div>
                        <div className="question">
                            {currentQuestion.question_text}
                        </div>
                        <div className="question-wrapper">
                            <p className="text-center">Click to select your answer</p>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>CONFIRM</button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="game-wrapper">
                            <div className="game-wrapper-inset row">
                                {['option1', 'option2', 'option3', 'option4'].map((optionKey, index) => (
                                    <div className="col-sm-3" key={index}> {/* Adjusted col-sm-3 for four options */}
                                        <div
                                            className={`answer-item ${activeOption === currentQuestion[optionKey] ? 'active' : ''}`}
                                            onClick={() => handleOptionClick(currentQuestion[optionKey])}
                                        >
                                            <input
                                                type="radio"
                                                id={`option${index + 1}-${currentQuestion.id}`}
                                                className="answer-inputs"
                                                name={`question-${currentQuestion.id}`}
                                                value={currentQuestion[optionKey]}
                                                checked={selectedOption === currentQuestion[optionKey]}
                                                onChange={() => setSelectedOption(currentQuestion[optionKey])}
                                            />
                                            <label htmlFor={`option${index + 1}-${currentQuestion.id}`} className="answer-block">
                                                {currentQuestion[optionKey]}
                                            </label>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {result && <div className="mt-3 text-center">{result}</div>}
            </div>
            <Footer />
        </div>
    );
};

export default Game;
