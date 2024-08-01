


import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import Loader from '../../Components/LoaderComponent';

const RecenetLuckyDraws = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/videos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setVideos(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching videos:', error);
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className='App'>
      <Header />
      <section className="home-header inner-page">
        <div className="container-fluid">
          <h3 className="mb-2 text-center">Winner of the Week</h3>
          <div className="w3l-bottom-grids-6 service-w3l-bg py-2 winners-list" id="winners">
            <div className="container-fluid col-lg-10">
              <div className="pt-md-4 justify-content-center">
                <div className="row">
                  {loading ? (
                    <Loader />
                  ) : (
                    videos.map((video, index) => (
                      <div className="mb-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                        <div className="card shadow-sm mb-4" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                          {video.video && (
                            <video
                              className="w-100"
                              controls
                              style={{ height: 'auto' }}
                              poster={video.thumbnail} // Ensure this path is correct
                            >
                              <source src={video.video} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          )}
                          <div className="card-body text-center" style={{ padding: '1rem' }}>
                            <h5 className="card-title">{video.title}</h5>
                            <p className="card-text"><strong>User Name:</strong> {video.user ? video.user.name : 'N/A'}</p>
                            <p className="card-text"><strong>Reward Name:</strong> {video.reward ? video.reward.name : 'N/A'}</p>
                            <p className="card-text"><strong>Date Announced:</strong> {video.date_announced ? new Date(video.date_announced).toLocaleDateString() : 'N/A'}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RecenetLuckyDraws;
