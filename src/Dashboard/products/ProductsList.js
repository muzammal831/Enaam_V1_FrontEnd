import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

function ProductsList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProducts(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`http://localhost:8000/api/products/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setProducts(products.filter(product => product.id !== id));
            } catch (error) {
                console.error('Error:', error.response ? error.response.data : error.message);
            }
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2 col-lg-2">
                    <Sidebar /> {/* Add Sidebar */}
                </div>
                <div className="col-md-10 col-lg-10 ml-auto mr-auto">
                    <div className="container-fluid mt-5">
                        <div className="mb-4 shadow p-4">
                            <h1 className="mt-2">Products List</h1>
                        </div>
                        <Link to="/dashboard/products/create" className="btn btn-primary mb-3 shadow">Add New Product</Link>
                        
                        <div className="table-responsive">
                            <table className="table table-striped shadow-sm rounded">
                                <thead style={{ backgroundColor: '#f8f9fa' }}>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Image</th>
                                        <th>Price</th>
                                        <th>Quantity</th>
                                        <th>Sold</th>
                                        <th>Stock</th>
                                        <th>Description</th>
                                        <th>Draw Date</th>
                                        <th>Reward</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map(product => (
                                        <tr key={product.id}>
                                            <td>{product.id}</td>
                                            <td>{product.name}</td>
                                            <td>
                                                {product.image && (
                                                    <img 
                                                        src={product.image} 
                                                        alt={product.name} 
                                                        style={{ width: '100px', height: 'auto', borderRadius: '5px' }} 
                                                    />
                                                )}
                                            </td>
                                            <td>${product.price}</td>
                                            <td>{product.quantity}</td>
                                            <td>{product.sold}</td>
                                            <td>{product.stock}</td>
                                            <td>{product.description}</td>
                                            <td>{product.draw_date}</td>
                                            <td>{product.reward ? product.reward.name : 'N/A'}</td>
                                            <td>
                                                <Link to={`/dashboard/products/${product.id}/edit/`} className="text-warning me-2" style={{ fontSize: '1.5rem' }}>
                                                    <i className="bi bi-pencil"/>
                                                </Link>
                                                <span 
                                                    onClick={() => handleDelete(product.id)} 
                                                    className="text-danger" 
                                                    style={{ fontSize: '1.5rem', cursor: 'pointer' }}>
                                                    <i className="bi bi-trash"/>
                                                </span>
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
    );
}

export default ProductsList;
