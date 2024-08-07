import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../../../Components/HeaderComponent'; // Import Header
import Footer from '../../../Components/FooterCompnent'; // Import Footer

const CheckoutPage = () => {
    const navigate = useNavigate();

    const handleNext = () => {
        const gameType = sessionStorage.getItem('gameType');
        if (gameType === 'MCQ') {
            navigate('/game'); // Replace '/game' with the actual route
        } else {
            navigate('/game'); // Replace '/game-football' with the actual route
        }
    };

    return (
        <div className="App">
            <Header /> {/* Add Header */}
            <div className="container-fluid col-lg-10 mt-5 p-5">
                
                    <div className="container-fluid mt-5 justify-content-start text-start">
                        <h3 className="mb-4 text-center">COMPETITION - SPECIAL</h3>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card shadow-lg p-4 mb-4 bg-light">
                                    <h4 className="text-center mt-4">HOW TO PLAY</h4>
                                    <ol className="apply-list">
                                        <li>1- Answer the question on the next screen</li>
                                        <li>2- Your answer applies to all tickets in this competition order</li>
                                        <li>3- Winner will be selected randomly by Lucky Draw</li>
                                    </ol>
                                    <div className="cart-btn-wrap" style={{ maxWidth: '200px', margin: 'auto' }}>
                                        <button onClick={handleNext} className="btn btn-primary" id="nextButton">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
              
            </div>
            <Footer /> {/* Add Footer */}
        </div>
    );
};

export default CheckoutPage;
