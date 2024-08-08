import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FlipClock from 'flipclock';
import 'flipclock/dist/flipclock.css';
import { useNavigate } from 'react-router-dom';

const Quiz = () => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://enaam.pk/api/questions/des/quiz-question');
        setQuestionData(response.data.data);
      } catch (error) {
        console.error('Error fetching question data:', error);
      }
    };
    
    fetchData();

    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
      alert("Please login to view your cart");
      // Handle redirection to login page
      navigate('/');
      return;
    } else {
      const clock = new FlipClock(('.clock'), 180, {
        clockFace: 'HourlyCounter',
        countdown: true,
        callbacks: {
          stop: () => {
            navigate('/cart');
          }
        }
      });
      clock.start();
    }
  }, []);

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.getAttribute('data-option-id'));
  };

  const submitAnswer = async () => {
    const user = JSON.parse(sessionStorage.getItem('user'));
    const { userId } = user;

    if (!selectedAnswer) {
      alert("Please select an answer");
      return;
    }

    const data = {
      questionId: questionData.id,
      userId: userId,
      optionId: selectedAnswer
    };

    try {
      const response = await axios.post('https://enaam.pk/api/questions/quiz-answer', data, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        sessionStorage.setItem('quizanswer', response.data.data);
        navigate('/cart-pay');
      } else {
        console.error('Error submitting answer:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error submitting answer:', error);
    }
  };

  if (!questionData) return <div>Loading...</div>;

  return (
    <section className="home-header inner-page">
      <div className="container sub-info">
        <div className="row">
          <div className="clock" style={{ marginTop: '-15px' }}></div>
          <div className="col-md-4 question-section">
            <div className="question">
              {questionData.title}
            </div>
            <div className="question-wrapper">
              <p className="text-center">Click to select your answer</p>
              <button onClick={submitAnswer}>CONFIRM</button>
            </div>
          </div>
          <div className="col-md-8">
            <div className="game-wrapper">
              <div className="game-wrapper-inset row">
                {questionData.options.map((option) => (
                  <div className="col-sm-4" key={option.id}>
                    <div className="answer-item">
                      <input
                        type="radio"
                        id={option.optionTitle}
                        className="answer-inputs"
                        name="selected-answer"
                        data-option-id={option.id}
                        onChange={handleAnswerChange}
                      />
                      <label htmlFor={option.optionTitle} className="answer-block">
                        {option.optionTitle}
                        <div className="selected-answer"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Quiz;
