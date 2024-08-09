


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer for notifications

function ProductsList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Add loading state
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [productToDelete, setProductToDelete] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.data.status === 200) {
                    setProducts(response.data.products);
                } else {
                    console.error('Failed to fetch products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        setFilteredProducts(
            products.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
        );
    }, [searchTerm, products]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:8000/api/products/${productToDelete}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setProducts(products.filter(product => product.id !== productToDelete));
            setShowDeleteModal(false);
            toast.success('Product deleted successfully!');
        } catch (error) {
            console.error('Error deleting product:', error.response ? error.response.data : error.message);
            toast.error('Failed to delete product.');
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">Products List</h1>
                            <Link to="/dashboard/products/create" className="btn btn-primary shadow-sm">
                                <i className="bi bi-plus-circle me-2"></i>Add Product
                            </Link>
                        </div>

                        <input
                            type="text"
                            placeholder="Search products..."
                            className="form-control mb-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />

                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader /> {/* Show Loader while fetching data */}
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-striped table-bordered shadow-sm rounded">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Sr.</th>
                                            <th>ID</th>
                                            <th className="col-2">Name</th>
                                            <th className="col-2 text-center">Image</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                        
                                            <th >Description</th>
                                            
                                            <th>Reward</th>
                                            <th className="col-2">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProducts.length ? (
                                            filteredProducts.map(product => (
                                                <tr key={product.id}>
                                                <td>{filteredProducts.indexOf(product) + 1}</td>
                                                    <td>{product.id}</td>
                                                    <td>{product.name}</td>
                                                    <td>
                                                        {product.image && (
                                                            <img
                                                                src={product.image}
                                                                alt={product.name}
                                                                className="img-fluid"
                                                                style={{ width: '90%', height: '80px', borderRadius: '10px' }} // Adjusted size
                                                            />
                                                        )}
                                                    </td>
                                                    <td>${product.price}</td>
                                                    <td>{product.quantity}</td>
                                        
                                                    <td className="text-truncate" style={{ maxWidth: '200px' }}>
                                                        {product.description}
                                                    </td>
                                                    
                                                    <td className="text-truncate"  style={{ maxWidth: '200px' }}>{product.reward ? product.reward.name : 'N/A'}</td>
                                                
                                                    <td className="text-center ">
    {/* Link to Product Details */}
    <Link
        to={`/dashboard/products/${product.id}`}
        className="btn btn-info btn-sm me-2 mt-3"
    >
        <i className="bi bi-eye "></i>
    </Link>

    {/* Link to Product Edit */}
    <Link
        to={`/dashboard/products/${product.id}/edit`}
        className="btn btn-primary btn-sm me-2 mt-3"
    >
        <i className="bi bi-pencil"></i>
    </Link>

    {/* Delete Button */}
    <button
        className="btn btn-danger btn-sm mt-3 me-2"
        onClick={() => {
            setProductToDelete(product.id);
            setShowDeleteModal(true);
        }}
    >
        <i className="bi bi-trash"></i>
    </button>
</td>

                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="11" className="text-center">No products found</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Confirm Deletion</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>
                            <div className="modal-body">
                                <p>Are you sure you want to delete this product?</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowDeleteModal(false)}>
                                    Cancel
                                </button>
                                <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
}

export default ProductsList;
