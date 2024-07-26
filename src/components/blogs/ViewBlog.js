import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function ViewBlog() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/blogs/${id}`, {
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

    if (!blog) return <div>Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <h1>{blog.heading}</h1>
                        <p>{blog.description}</p>
                        {blog.blog_image && (
                            <img
                                src={`http://localhost:8000/storage/blog_images/${blog.blog_image}`}
                                alt="Blog"
                                className="img-fluid"
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ViewBlog;
