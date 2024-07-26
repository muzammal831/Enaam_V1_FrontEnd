import React, { useEffect, useState } from 'react'

import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import Loader from '../../Components/LoaderComponent';

import { getRecentLuckyDraws } from '../../Services/GetAPI';
import "../../css/Styles.css"

const RecenetLuckyDraws = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRecentLuckyDraws()
      .then(data => {
        setVideos(data);
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
          <h3 className="mb-2 text-center">Winner of the Week</h3>
          <div className="w3l-bottom-grids-6 service-w3l-bg py-2 winners-list" id="winners">
            <div className="container">
              <div className="pt-md-4 justify-content-center">
                <div className="row">
                  {loading ? (
                    <Loader />
                  ) : (videos.map((video, index) => (
                    <div className="mb-3 col-lg-4 col-md-6 grids-feature" key={index}>
                      <iframe
                        width="100%"
                        height="250px"
                        src={video?.url}
                        title={video?.title}
                        style={{ borderRadius: "15px" }}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}
export default RecenetLuckyDraws;
