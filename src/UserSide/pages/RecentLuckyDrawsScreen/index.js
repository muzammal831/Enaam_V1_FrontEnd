


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import Loader from '../../Components/LoaderComponent';
const RecentLuckyDraws = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/videos', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (response.data.status === 200 && Array.isArray(response.data.videos)) {
          setVideos(response.data.videos);
        } else {
          console.error('Unexpected response format:', response.data);
        }
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
          <h3 className="title-style mb-2 text-center"style={{ fontWeight: "600" }}>Winners of the Week</h3>
          <div className="w3l-bottom-grids-6 service-w3l-bg py-2 winners-list" id="winners">
            <div className="container-fluid col-lg-10">
              <div className="pt-md-4 justify-content-center">
                <div className="row">
                  {loading ? (
                    <Loader />
                  ) : (
                    videos.length > 0 ? (
                      videos.map((video, index) => (
                        <div className="mb-3 col-lg-4 col-md-6 col-sm-12" key={index}>
                          <div className="card shadow-sm mb-4" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                            {video.video && (
                              <video
                                className="w-100"
                                controls
                                style={{ height: '200px' }}
                                poster={video.thumbnail}
                              >
                                <source src={video.video} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            )}
                            <div className="card-body text-center" style={{ padding: '1rem' }}>
                              <h5 className="card-title">{video.title}</h5>
                              <p className="username-text mb-2"><h5 className='text-center font-weight-bold'>{video.user ? video.user.name : 'N/A'}</h5></p>
                              <p className="card-text"><strong>Reward Name:</strong> {video.reward ? video.reward.name : 'N/A'}</p>
                              <p className="card-text"><strong className='text-muted'>Announced on:</strong> {video.date_announced ? new Date(video.date_announced).toLocaleDateString() : 'N/A'}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="col-12 text-center">No videos available</div>
                    )
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
export default RecentLuckyDraws;