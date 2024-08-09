import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from'../../Components/HeaderComponent'
import Footer from '../../Components/FooterCompnent';

const InititalGameScreen = () => {
    const navigate = useNavigate();
    

    return (
        <div className="App">
            <Header />
            <div className="container-fluid col-lg-10 mt-5 p-5">
                    <div className="container-fluid mt-5 text-star">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="card p-4 mb-4 bg-light glow" style={{borderRadius:20}}>
                                    <h1 className="text-center mt-4">HOW TO PLAY</h1>
                                    <ol className="apply-list" style={{textAlign:"left"}}>
                                        <li>1- Answer the question on the next screen</li>
                                        <li>2- Your answer applies to all tickets in this competition order</li>
                                        <li>3- Winner will be selected randomly by Lucky Draw</li>
                                    </ol>
                                    <div className="cart-btn-wrap" style={{ margin: 'auto' ,}}>
                                        <button onClick={()=>{ navigate('/GameScreen'); }} style={{padding:"10px 100px 10px" }} className="btn btn-primary" id="nextButton">
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

export default InititalGameScreen;
