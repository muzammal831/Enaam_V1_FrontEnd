import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/blogs', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setBlogs(response.data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        fetchBlogs();
    }, []);

    const handleEdit = (id) => {
        navigate(`/dashboard/blogs/${id}/edit`);
    };

    const handleView = (id) => {
        navigate(`/dashboard/blogs/${id}`);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/blogs/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setBlogs(blogs.filter(blog => blog.id !== id));
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const truncateText = (text, wordLimit) => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-2 col-md-4 col-sm-12">
                    <Sidebar />
                </div>
                <div className="col-lg-10 col-md-8 col-sm-12">
                    <div className="container-fluid mt-5">
                        <div className="card shadow-sm mb-4">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h1>Blogs List</h1>
                                    <button className="btn btn-primary" onClick={() => navigate("/dashboard/blogs/add")}>
                                        <i className="bi bi-plus-circle"></i> Add New Blog
                                    </button>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead className="table-dark">
                                            <tr>
                                                <th scope="col">Heading</th>
                                                <th scope="col">Description</th>
                                                <th scope="col">Image</th>
                                                <th scope="col">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blogs.map(blog => (
                                                <tr key={blog.id}>
                                                    <td>{blog.heading}</td>
                                                    <td>{truncateText(blog.description, 30)}</td>
                                                    <td className='d-flex justify-content-center'>
                                                        {blog.blog_image && (
                                                            <img
                                                                src={blog.blog_image}
                                                                alt="Blog"
                                                                width="100"
                                                                className="img-thumbnail"
                                                            />
                                                        )}
                                                    </td>
                                                    <td>
                                                        <i className="bi bi-eye text-primary mx-2" role="button" onClick={() => handleView(blog.id)}></i>
                                                        <i className="bi bi-pencil text-warning mx-2" role="button" onClick={() => handleEdit(blog.id)}></i>
                                                        <i className="bi bi-trash text-danger mx-2" role="button" onClick={() => handleDelete(blog.id)}></i>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogList;
