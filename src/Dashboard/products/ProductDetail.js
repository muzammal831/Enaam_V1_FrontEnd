

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function ProductDetail() {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (response.status === 200) {
                    setProduct(response.data);
                } else {
                    toast.error('Failed to fetch product details.');
                }
            } catch (error) {
                console.error('Error fetching product details:', error.response ? error.response.data : error.message);
                toast.error('Error fetching product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
                <Loader /> {/* Show Loader while fetching data */}
            </div>
        );
    }

    if (!product) {
        return <p className="text-center text-danger">No product found</p>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow p-3 mb-2 bg-light rounded">
                                Product Detail
                            </h1>
                            <Link to="/dashboard/products" className="btn btn-secondary shadow-sm">
                                <i className="bi bi-arrow-left me-2"></i> Back to Products List
                            </Link>
                        </div>

                        <div className="card shadow-lg border-0 rounded">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-4 d-flex justify-content-center">
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="img-fluid rounded shadow"
                                            style={{ maxWidth: '100%', height: 'auto' }} // Adjust image size
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <h2 className="text-primary mb-3">{product.name}</h2>
                                        <div className="mb-3">
                                            <p><strong>ID:</strong> {product.id}</p>
                                            <p><strong>Price:</strong> ${product.price}</p>
                                            <p><strong>Quantity:</strong> {product.quantity}</p>
                                            <p><strong>Sold:</strong> {product.sold}</p>
                                            <p><strong>Stock:</strong> {product.stock}</p>
                                            <p><strong>Description:</strong> {product.description}</p>
                                            <p><strong>Draw Date:</strong> {product.draw_date}</p>
                                            <p><strong>Reward:</strong> {product.reward ? product.reward.name : 'N/A'}</p>
                                        </div>
                                        {product.reward && product.reward.image && (
                                            <div className="mt-3">
                                                <p><strong>Reward Image:</strong></p>
                                                <img
                                                    src={product.reward.image}
                                                    alt={product.reward.name}
                                                    className="img-fluid rounded shadow"
                                                    style={{ maxWidth: '150px', height: 'auto' }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
