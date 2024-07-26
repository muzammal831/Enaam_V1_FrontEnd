import React, { useEffect, useState } from 'react'
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import Loader from '../../Components/LoaderComponent';
import { getBlogs } from '../../Services/GetAPI';
import "../../css/Styles.css";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBlogs()
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='App'>
      <Header />
      <section className="home-header inner-page">
        <div className="container">
          <h3 className="mb-4 text-center">BLOGS</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="">
                <div className="">
                  <div className="row">
                    {loading ? (
                      <Loader />
                    ) : (
                      blogs.map((blog, index) => (
                        <div className="col-md-4 mb-30" key={index}>
                          <div className="card-content glow" style={{borderRadius:"15px"}} >
                            <div className="card-img">
                              <img src={blog.imageUrl} alt="" style={{height:350,width:"100%",borderRadius:"15px"}} />
                            </div>
                            <div className="card-desc">
                              <h3>{blog.heading}</h3>
                              <p>{blog.details.substring(0, 120)}</p>
                              <div style={{display:"flex"}}/>
                              <a href={`blog-detail.php?id=${blog.id}&name=${blog.heading}`}  className="btn-card">Read</a>
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
        </div>
      </section>
      <Footer />
    </div>
  )
}
export default Blogs;