import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Loader from '../../../Components/LoaderComponent';
import './RecentLuckyDraws.css'; // Ensure this CSS file is imported
import { useApp } from '../../../Services/AppContext';

const RecentLuckyDraws = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(true);
    const { videos, loading , getVideos } = useApp();

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? videos.length - 1 : prevIndex - 1));
        setIsPaused(true); // Pause when changing slides
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex === videos.length - 1 ? 0 : prevIndex + 1));
        setIsPaused(true); // Pause when changing slides
    };


    useEffect(()=>{
    getVideos()
    },[])


    return (
        <section className="image-with-content py-5 video-section">
            {videos?.length > 0 && <div className="container py-md-5 py-4">
                <div className="row align-items-center video-bg hide-on-mobile">
                    <div className="col-lg-12 content-sec-1">
                        <h4 className="title-style mb-3 text-center">Recent Lucky Draws</h4>
                    </div>
                    <div className="col-lg-12 mt-5">
                        {loading ? <Loader /> : <iframe
                            width="560"
                            height="315"
                            src={videos[0]?.video}
                            title={videos[0]?.title}
                            style={{ borderRadius: 20 }}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>}
                    </div>
                </div>

                <div className="w3-stats mt-5 pt-4 mtm-0" id="products">
                    <div className="row text-center">
                        <div
                            id="carouselExampleIndicatoriframs"
                            className="carousel slide hide-on-mobile w-100"
                            data-ride="carousel"
                        >
                            <ol className="carousel-indicators iframs-slider products-c">
                                {videos.map((_, index) => (
                                    <li
                                        key={index}
                                        data-target="#carouselExampleIndicatoriframs"
                                        data-slide-to={index}
                                        className={index === activeIndex ? 'active' : ''}
                                        onClick={() => setActiveIndex(index)}
                                    ></li>
                                ))}
                            </ol>
                            <div className="carousel-inner">
                                {videos.map((chunk, index) => (
                                    <div
                                        key={index}
                                        className={`carousel-item ${index === activeIndex ? 'active' : ''}`}
                                    >
                                        <div className="row">
                                            {videos.map((video, i) => (
                                                <div key={i} className="col-md-3 col-6">
                                                    <iframe
                                                        width="100%"
                                                        height="150px"
                                                        src={video.video}
                                                        title={video.title}
                                                        style={{ borderRadius: 20 }}
                                                        frameBorder="0"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                        allowFullScreen
                                                    ></iframe>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <a
                                className="carousel-control-prev"
                                href="#carouselExampleIndicatoriframs"
                                role="button"
                                data-slide="prev"
                                onClick={handlePrevClick}
                            >
                                <span className="carousel-control-prev-icon" style={{ borderRadius: "5px" }} aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a
                                className="carousel-control-next"
                                href="#carouselExampleIndicatoriframs"
                                role="button"
                                data-slide="next"
                                onClick={handleNextClick}
                            >
                                <span className="carousel-control-next-icon" style={{ borderRadius: "5px" }} aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>

                    <div
                        id="carouselExampleIndicatoriframsmobile"
                        className="carousel slide show-on-mobile w-100"
                        data-ride="carousel"
                    >
                        <ol className="carousel-indicators iframs-slider products-c">
                            {videos.map((_, index) => (
                                <li
                                    key={index}
                                    data-target="#carouselExampleIndicatoriframsmobile"
                                    data-slide-to={index}
                                    className={index === 0 ? 'active' : ''}
                                ></li>
                            ))}
                        </ol>
                        <div className="carousel-inner">
                            {videos.map((video, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <div className="row">
                                        <div className="col-md-3 col-12">
                                            <iframe
                                                width="100%"
                                                height="150px"
                                                src={video.url}
                                                title={video.title}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                                allowFullScreen
                                            ></iframe>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a
                            className="carousel-control-prev"
                            href="#carouselExampleIndicatoriframsmobile"
                            role="button"
                            data-slide="prev"
                        >
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a
                            className="carousel-control-next"
                            href="#carouselExampleIndicatoriframsmobile"
                            role="button"
                            data-slide="next"
                        >
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>}
        </section>
    );
};

export default RecentLuckyDraws;
