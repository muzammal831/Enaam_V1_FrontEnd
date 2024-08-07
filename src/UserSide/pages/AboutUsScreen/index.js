



import React, { useEffect, useState } from 'react';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import axios from 'axios';
import "../../css/Styles.css";
import Loader from '../../Components/LoaderComponent';

// Define the API endpoint and token for better management
const API_URL = 'http://3.138.38.248/Enaam_Backend_V1/public/api/about-us';
const TOKEN = localStorage.getItem('token');

const AboutUs = () => {
  const [aboutUsList, setAboutUsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutUsData = async () => {
      try {
        const response = await axios.get(API_URL, {
          headers: {
            Authorization: `Bearer ${TOKEN}`,
          },
        });

        // Check if the response status is 200 and data format is as expected
        if (response.data.status === 200 && Array.isArray(response.data.aboutUs)) {
          setAboutUsList(response.data.aboutUs);
        } else {
          console.error('Unexpected response format:', response.data);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching About Us data:', error);
        setLoading(false);
      }
    };

    fetchAboutUsData();
  }, []);

  return (
    <div className='App'>
      <Header />
      <div style={{ height: "1vh" }} />
      <section className="home-header inner-page">
        <div className="container-fluid col-lg-10">
          <h3 className="mb-4 text-center">About Us</h3>
          {loading ? (
            <Loader />
          ) : (
            aboutUsList.length > 0 ? (
              <div className="row">
                {aboutUsList.map((item, index) => (
                  <div className="col-md-12 mb-4" key={index}>
                    <div className="card shadow-sm">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-md-8 text-left">
                            <h4 className="mt-4">{item.heading}</h4>
                            <p style={{ fontSize: '13px', textAlign: 'justify' }}>{item.about_detail}</p>
                          </div>
                          {item.about_image && (
                            <div className="col-md-4">
                              <img src={item.about_image} alt={item.heading} className="img-fluid" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center">No About Us data available.</p>
            )
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
