import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Header from '../../Components/HeaderComponent';
import Footer from '../../Components/FooterCompnent';
import Loader from '../../Components/LoaderComponent';
import "../../css/Styles.css";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/blogs/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setBlog(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!blog) {
    return <p>Blog not found</p>;
  }

  return (
    <div className='App'>
      <Header />
      <section className="blog-details-header inner-page">
        <div className="container">
          <h3 className="mb-4 text-center">{blog.heading}</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="card-content glow" style={{ borderRadius: "15px" }}>
                <div className="card-img">
                  <img src={blog.blog_image} alt={blog.heading} style={{ height: 500, width: "100%", borderRadius: "15px" }} />
                </div>
                <div className="card-desc mt-4">
                  <p>{blog.description}</p>
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

export default BlogDetails;
