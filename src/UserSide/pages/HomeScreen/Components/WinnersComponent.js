import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getWinners } from '../../../Services/GetAPI';
import { WinnerComponent } from '../../WinnersPage/Components/WinnerComponent';
import Loader from '../../../Components/LoaderComponent';
import { Colors } from '../../../globals/colors';

const WinnersCarousel = ({ }) => {
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrevClick = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? winners.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex === winners.length - 1 ? 0 : prevIndex + 1));
    };

    const groupedWinners = [];
    for (let i = 0; i < winners.length; i += 3) {
        groupedWinners.push(winners.slice(i, i + 3));
    }


    useEffect(() => {
        getWinners()
            .then(data => {
                setWinners(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching videos:', error);
                setLoading(false);
            });
    }, []);

    return (
        <section class="w3l-bottom-grids-6 service-w3l-bg py-5 show-on-desktop of-x-hide" id="winners">
            <div className="container py-md-5 py-4">
                <div className="title-main text-center mx-auto" style={{ maxWidth: '600px' }}>
                    <h3 className="mt-2 text-white text-center mb-3">Winners</h3>
                </div>
                <p className="title-style text-white text-center mb-3">
                    All our winners are announced in this section.
                </p>
                <div className="row pt-md-4 justify-content-center">
                    <div id="carouselExampleIndicators2" className="carousel slide" data-ride="carousel" style={{ width: '100%' }}>
                        <ol className="carousel-indicators products-c">
                            {groupedWinners.map((_, index) => (
                                <li
                                    key={index}
                                    data-target="#carouselExampleIndicators2"
                                    data-slide-to={index}
                                    className={index === activeIndex ? 'active' : ''}
                                    onClick={() => setActiveIndex(index)}
                                ></li>
                            ))}
                        </ol>
                        <div className="carousel-inner show-on-desktop">
                            {groupedWinners.map((group, index) => (
                                <div key={index} className={`carousel-item ${index === activeIndex ? 'active' : ''}`}>
                                    <div className="row">
                                        {loading ? (
                                            <Loader />
                                        ) : (group.map((winner, j) => {
                                            const announcementDate = new Date(winner.announcementDate);
                                            const formattedDate = announcementDate.toLocaleString('en-US', {
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hour12: true,
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            });

                                            return (
                                                <WinnerComponent winner={winner} data={formattedDate} index={index} />
                                            );
                                        }))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <a className="carousel-control-prev" href="#carouselExampleIndicators2" role="button" data-slide="prev" onClick={handlePrevClick}>
                            <span className="carousel-control-prev-icon" style={{borderRadius:"5px"}} aria-hidden="true"></span>
                            <span className="sr-only">Previous</span>
                        </a>
                        <a className="carousel-control-next" href="#carouselExampleIndicators2" role="button" data-slide="next" onClick={handleNextClick}>
                            <span className="carousel-control-next-icon" style={{borderRadius:"5px"}} aria-hidden="true"></span>
                            <span className="sr-only">Next</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WinnersCarousel;
