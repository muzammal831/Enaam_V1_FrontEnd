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
        navigate(`/blogs/${id}/edit`);
    };

    const handleView = (id) => {
        navigate(`/blogs/${id}`);
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
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h1>Blogs List</h1>
                            <button className="btn btn-primary" onClick={() => navigate('/blogs/add')}>
                                <i className="bi bi-plus-circle"></i> Add New Blog
                            </button>
                        </div>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Heading</th>
                                    <th>Description</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {blogs.map(blog => (
                                    <tr key={blog.id}>
                                        <td>{blog.heading}</td>
                                        <td>{truncateText(blog.description, 30)}</td>
                                        <td>
                                            {blog.blog_image && (
                                                <img
                                                    src={`http://localhost:8000/storage/blog_images/${blog.blog_image}`}
                                                    alt="Blog"
                                                    width="100"
                                                />
                                            )}
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => handleView(blog.id)}>
                                                <i className="bi bi-eye"></i>
                                            </button>
                                            <button className="btn btn-secondary mx-2" onClick={() => handleEdit(blog.id)}>
                                                <i className="bi bi-pencil"></i>
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(blog.id)}>
                                                <i className="bi bi-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BlogList;
