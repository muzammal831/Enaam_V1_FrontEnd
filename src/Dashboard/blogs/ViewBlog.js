


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import 'bootstrap/dist/css/bootstrap.min.css';


function ViewBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/blogs/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBlog(response.data);
            } catch (error) {
                console.error('Error fetching blog:', error);
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) return <div className="text-center my-5"><div className="spinner-border" role="status"><span className="sr-only">Loading...</span></div></div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10">
                    <div className="container-fluid mt-5">
                        <div className="card shadow-lg p-3 mb-5 bg-white rounded">
                            <div className="card-body">
                                <h1 className="card-title">{blog.heading}</h1>
                                <p className="card-text">{blog.description}</p>
                                {blog.blog_image && (
                                    <img
                                        src={blog.blog_image}
                                        alt="Blog"
                                        className="img-fluid rounded"
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBlog;
