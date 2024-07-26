import React, { useEffect, useState } from 'react';
import { WinnerComponent } from './Components/WinnerComponent';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import { getWinners } from '../../Services/GetAPI';
import Loader from '../../Components/LoaderComponent';
const Winners = () => {
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <div className='App'>
            <Header />
            <section className="home-header inner-page">
                <div className="container">
                    <h3 className="mb-2 text-center">Winners</h3>
                    <p className="mb-2 text-center">All our winners are announced in this section.</p>
                    <div className="w3l-bottom-grids-6 service-w3l-bg py-2 winners-list" id="winners">
                        <div className="container">
                            <div className="row pt-md-4 justify-content-center">
                                <div className="">
                                    <div className="row">
                                        {loading ? (
                                            <Loader />
                                        ) : (winners.map((winner, index) => {
                                            const announcementDate = new Date(winner?.announcementDate);
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
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </div>
    );
}



export default Winners;
