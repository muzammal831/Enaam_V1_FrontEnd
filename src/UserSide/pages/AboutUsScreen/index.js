

import React, { useEffect, useState } from 'react';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import axios from 'axios';
import "../../css/Styles.css";
import Loader from '../../Components/LoaderComponent';

// Define the API endpoint and token for better management
const API_URL = 'http://localhost:8000/api/about-us';
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
        setAboutUsList(response.data);
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
            <div className="row">
              {aboutUsList.length > 0 ? (
                <div className="col-md-12 mb-4">
                  <div className="card shadow-sm">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-8 text-left">
                          <h4 className="mt-4">{aboutUsList[0].heading}</h4>
                          <p style={{ fontSize: '13px', textAlign: 'justify' }}>{aboutUsList[0].about_detail}</p>
                        </div>
                        {aboutUsList[0].about_image && (
                          <div className="col-md-4">
                            <img src={aboutUsList[0].about_image} alt={aboutUsList[0].heading} className="img-fluid" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-center">No About Us data available.</p>
              )}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default AboutUs;
