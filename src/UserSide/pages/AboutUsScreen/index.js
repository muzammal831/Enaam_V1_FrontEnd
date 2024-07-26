import React, { useEffect, useState } from 'react'
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import { getAboutUsData } from '../../Services/GetAPI';
import "../../css/Styles.css"
import Loader from '../../Components/LoaderComponent';

const AboutUs = () => {
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAboutUsData()
      .then(data => {
        setAbout(data);
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
      <div style={{ height: "15hv" }} />
      <section className="home-header inner-page">
        <div className="container">
          <h3 className="mb-4 text-center">About Us</h3>
          <div className="row" >
            <div className="col-md-12" >
              <div className="sub-info glow" >
                <div className="">
                  <div className="row">
                    <div className="col-md-8 text-left">
                      <h4 className="mt-4">{about.heading}</h4>
                      <p style={{ fontSize: '13px', textAlign: 'justify' }}>{about.details}</p>
                    </div>
                    {loading ? (
                      <Loader />
                    ) : (about.imageUrl && (
                      <div className="col-md-4">
                        <img src={about?.imageUrl} alt="About" className="img-fluid" />
                      </div>
                    ))}
                  </div>
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
export default AboutUs;
