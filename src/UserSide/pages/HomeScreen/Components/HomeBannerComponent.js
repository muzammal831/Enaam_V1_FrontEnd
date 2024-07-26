import React, { useState, useEffect } from "react";
import "../../../css/Styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../../Components/HeaderComponent";
import { getBanners } from "../../../Services/GetAPI";
import Loader from "../../../Components/LoaderComponent";

const HomeBanner = () => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBanners()
      .then((data) => {
        if (window.innerWidth <= 768) {
          const mobileBanners = data.filter(
            (banner) => banner.type !== "DESKTOP"
          );
          setBanners(mobileBanners);
          console.log(mobileBanners);
        } else {
          const desktopBanners = data.filter(
            (banner) => banner.type === "DESKTOP"
          );
          setBanners(desktopBanners);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching FAQs:", error);
        setLoading(false);
      });
  }, [banners]);

  return (
    <div className="home-header">
      <Header />
      <section id="home" className="w3l-banner">
        <div className="banner-image"></div>
        <div className="banner-content">
          <div className="container-fluid pt-5 pb-md-4">
            <div
              id="carouselExampleIndicators"
              className="carousel slide hide-on-mobile"
              data-ride="carousel"
            >
              {loading ? (
                <Loader />
              ) : (
                <>
                  <ol className="carousel-indicators">
                    {banners
                      ?.filter((item) => item.type === "DESKTOP")
                      .map((item, index) => (
                        <li
                          key={index}
                          data-target="#carouselExampleIndicators"
                          data-slide-to={index}
                          className={index === 0 ? "active" : ""}
                        ></li>
                      ))}
                  </ol>
                  <div className="carousel-inner">
                    {banners
                      ?.filter((item) => item.type === "DESKTOP")
                      .map((banner, index) => (
                        <div
                          key={index}
                          className={`carousel-item ${index === 0 ? "active" : ""
                            }`}
                        >
                          <div className="row align-items-center">
                            <div className="col-12">
                              <img
                                style={{ borderRadius: 20 }}
                                className="img-fluid"
                                src={banner.bannerImage}
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
                  style={{borderRadius:"5px"}}
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
                  style={{borderRadius:"5px"}}
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
