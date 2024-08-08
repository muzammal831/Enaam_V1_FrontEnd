
import React, { useState, useEffect } from "react";
import "../../../css/Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../Components/HeaderComponent";
import Loader from "../../../Components/LoaderComponent";
import { useApp } from "../../../Services/AppContext";

const HomeBanner = () => {
  const {loading , banners , getBanners} = useApp();

  useEffect(() => {
    getBanners()
  }, []);

  return (
    <div className="home-header">
      <Header />
      <section id="home" className="w3l-banner">
        <div className="banner-content">
          <div className="container-fluid pt-5 pb-md-4">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <ol className="carousel-indicators">
                    {banners.map((item, index) => (
                      <li
                        key={index}
                        data-target="#carouselExampleIndicators"
                        data-slide-to={index}
                        className={index === 0 ? "active" : ""}
                      ></li>
                    ))}
                  </ol>
                  <div className="carousel-inner">
                    {banners.map((banner, index) => (
                      <div
                        key={index}
                        className={`carousel-item ${index === 0 ? "active" : ""
                          }`}
                      >
                        <div className="row align-items-center">
                          <div className="col-12">
                            <img
                              style={{ borderRadius: 20 }}
                              className="img-fluid on-mobile"
                              src={banner.image}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                  style={{ borderRadius: "5px" }}
                ></span>
                <span className="sr-only" >Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                  style={{ borderRadius: "5px" }}
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeBanner;
