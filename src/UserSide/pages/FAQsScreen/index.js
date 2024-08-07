import React, { useState, useEffect } from 'react';
import Loader from '../../Components/LoaderComponent';
import { getFaqs } from '../../Services/GetAPI';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getFaqs()
      .then(data => {
        setFaqs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='App'>
      <Header />
      <div style={{ height: "15hv" }} />
      <section className="home-header inner-page">
        <div className="container-fluid ">
          <h3 className="mb-4 text-center">FAQs</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <h4 className="text-center mt-4"></h4>
                <div className="">
                  <div className="row">
                    <div className="col-md-10 offset-md-1">
                      {loading ? (
                        <Loader />
                      ) : (
                        <div className="accordion " id="accordion">
                          {faqs.map((faq, index) => {
                            const collapseId = `collapse${index + 1}`;
                            return (
                              <div className="card glow" key={index}>
                                <div className="card-header">
                                  <a
                                    style={{ textAlign: "left", textDecoration: "none" }}
                                    className="card-link text-dark"
                                    data-toggle="collapse"
                                    href={`#${collapseId}`}
                                  >
                                    <span className="float-right">
                                      <i className="fa fa-arrow-down"></i>
                                    </span>
                                    <h6>{faq?.question}</h6>
                                  </a>
                                </div>
                                <div
                                  id={collapseId}
                                  className="collapse"
                                  data-parent="#accordion"
                                >
                                  <div className="card-body" style={{ textAlign: "left" }}>
                                    {faq?.answer}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
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
};

export default FAQs;
