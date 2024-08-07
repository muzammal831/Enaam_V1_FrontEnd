


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import Loader from '../../Components/LoaderComponent';
import "../../css/Styles.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/blogs', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.data.status === 200 && Array.isArray(response.data.blogs)) {
          setBlogs(response.data.blogs);
        } else {
          console.error('Unexpected response format:', response.data);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  return (
    <div className='App'>
      <Header />
      <section className="home-header inner-page">
        <div className="container-fluid col-lg-10">
          <h3 className="mb-4 text-center">BLOGS</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                {loading ? (
                  <Loader />
                ) : (
                  blogs.length > 0 ? (
                    blogs.map((blog) => (
                      <div className="col-md-4 mb-4" key={blog.id}>
                        <div className="card h-100 shadow-sm" style={{ borderRadius: "15px" }}>
                          <div className="card-img-top">
                            <img src={blog.blog_image} alt={blog.heading} style={{ height: "250px", width: "100%", objectFit: "cover", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }} />
                          </div>
                          <div className="card-body d-flex flex-column">
                            <h5 className="card-title">{blog.heading}</h5>
                            <p className="card-text">{truncateText(blog.description, 20)}</p>
                            <button className="btn btn-primary mt-auto" onClick={() => navigate(`/blogs/${blog.id}`)}>Read More</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="col-12 text-center">No blogs available</div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Blogs;
