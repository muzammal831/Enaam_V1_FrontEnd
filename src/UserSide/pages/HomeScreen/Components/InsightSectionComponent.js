import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../css/Styles.css';

const InsightSection = () => {
    return (
        <section className="w3l-bottom-grids-6 service-w3l-bg py-5 mb-50 how-it-works-wrapper" id="winners">
            <div className="container-fluid py-md-5 py-4 col-lg-10">
                <div className="row">
                    <div className="col-md-6 m-o-2">
                        <ul className="how-it-works-listing">
                            <li>
                                <div className="working-img">
                                    <img src={require("../../../images/how-works/monitor-mobbile.png")} alt="Register" />
                                </div>
                                <div className="title-x">
                                    Register
                                </div>
                            </li>
                            <li>
                                <div className="working-img">
                                    <img src={require("../../../images/how-works/gift.png")} alt="Browse Prizes" />
                                </div>
                                <div className="title-x">
                                    Browse Prizes
                                </div>
                            </li>
                            <li>
                                <div className="working-img">
                                    <img src={require("../../../images/how-works/heart.png")} alt="Choose your favourite item to win" />
                                </div>
                                <div className="title-x">
                                    Choose your favourite item to win
                                </div>
                            </li>
                            <li>
                                <div className="working-img">
                                    <img src={require("../../../images/how-works/dollar-square.png")} alt="Answer a simple question & pay item entry fee" />
                                </div>
                                <div className="title-x">
                                    Answer a simple question & pay item entry fee
                                </div>
                            </li>
                            <li>
                                <div className="working-img">
                                    <img src={require("../../../images/how-works/calendar.png")} alt="Wait for lucky draw & get a chance to win" />
                                </div>
                                <div className="title-x">
                                    Wait for lucky draw & get a chance to win
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-6 m-o-1" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                        <h2 className="text-center" style={{ color: '#fff', marginBottom: '30px', textAlign: "center" }}>How It Works</h2>
                        <iframe
                            style={{ maxWidth: '100%', borderRadius: 30, marginBottom: '20px', }}
                            width="560"
                            height="315"
                            src="https://www.youtube.com/embed/_x_WFdi4EmA"
                            title="How It Works"
                            frameBorder="0"
                            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default InsightSection;
