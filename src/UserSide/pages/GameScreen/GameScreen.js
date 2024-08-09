import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import 'flipclock/dist/flipclock.css';
import FlipClock from 'flipclock';
import '../../css/Styles.css';
import Loader from '../../Components/LoaderComponent';
import { BASE_URL } from '../../Services';

const GameScreen = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [result, setResult] = useState('');
    const [activeOption, setActiveOption] = useState(null);
    const clockRef = useRef(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/questions', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                if (response.data.status === 'Success') {
                    setQuestions(response.data.data); // Use the 'data' field from the response
                    selectRandomQuestion(response.data.data); // Use the 'data' field from the response
                } else {
                    console.error('Failed to fetch questions.');
                }
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
                    stop: function () {
                        window.location.href = `${BASE_URL}/questions`;
                    }
                }
            });
            clock.setTime(180); // Time in seconds
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
            const isCorrect = currentQuestion.options.some(option => option.optionTitle === selectedOption && option.correctOption === 'Y');
            setResult(isCorrect ? 'Correct!' : 'Wrong answer!');

            try {
                const token = localStorage.getItem('token'); // Assuming token is stored in local storage

                // Update cart with correctness
                await axios.post(
                    'http://localhost:8000/api/cart/update-is-correct',
                    { is_correct: isCorrect ? 'yes' : 'no' },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                // Submit cart data to invoice
                await axios.post(
                    'http://localhost:8000/api/cart/addInvoice',
                    { is_correct: isCorrect ? 'yes' : 'no' },
                    { headers: { Authorization: `Bearer ${token}` } }
                );

                setTimeout(() => {
                    selectRandomQuestion(questions);
                    setSelectedOption('');
                    setResult('');
                    setActiveOption(null);
                }, 2000);
            } catch (error) {
                console.error('Error processing the request:', error);
            }
        }
    };

    const handleOptionClick = (optionValue) => {
        setSelectedOption(optionValue);
        setActiveOption(optionValue);
    };


    if (!currentQuestion) return <Loader/>;
    return (
        <div className="App">
            <Header />
            <div className="container-fluid col-lg-10 mt-5 p-5">
                <h1 className="text-center">Answer Question</h1>
                <div className="row">
                    <div className="col-md-4 question-section">
                        <div className="clock" ref={clockRef} style={{ marginTop: '-15px' }}></div>
                        <div className="question">
                            {currentQuestion.title}
                        </div>
                        <div className="question-wrapper">
                            <p className="text-center">Click to select your answer</p>
                            <button type="button" className="btn btn-primary" onClick={handleSubmit}>CONFIRM</button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="game-wrapper">
                            <div className="game-wrapper-inset row">
                                {currentQuestion.options.map((option, index) => (
                                    <div className="col-sm-3" key={index}> {/* Adjusted col-sm-3 for four options */}
                                        <div
                                            className={`answer-item ${activeOption === option.optionTitle ? 'active' : ''}`}
                                            onClick={() => handleOptionClick(option.optionTitle)}
                                        >
                                            <input
                                                type="radio"
                                                id={`option${index + 1}-${currentQuestion.id}`}
                                                className="answer-inputs"
                                                name={`question-${currentQuestion.id}`}
                                                value={option.optionTitle}
                                                checked={selectedOption === option.optionTitle}
                                                onChange={() => setSelectedOption(option.optionTitle)}
                                            />
                                            <label htmlFor={`option${index + 1}-${currentQuestion.id}`} className="answer-block">
                                                {option.optionTitle}
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

export default GameScreen;
