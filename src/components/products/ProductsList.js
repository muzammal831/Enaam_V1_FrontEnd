
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function ProductsList() {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         const fetchProducts = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/admin/products', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 setProducts(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchProducts();
//     }, []);

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this product?')) {
//             try {
//                 await axios.delete(`http://localhost:8000/api/admin/products/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 setProducts(products.filter(product => product.id !== id));
//             } catch (error) {
//                 console.error('Error:', error.response ? error.response.data : error.message);
//             }
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h1>Products List</h1>
//             <Link to="/admin/products/create" className="btn btn-primary mb-3">Add New Product</Link>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>ID</th>
//                         <th>Name</th>
//                         <th>Image</th>
//                         <th>Price</th>
//                         <th>Quantity</th>
//                         <th>Sold</th>
//                         <th>Stock</th>
//                         <th>Description</th>
//                         <th>Draw Date</th>
//                         <th>Reward</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {products.map(product => (
//                         <tr key={product.id}>
//                             <td>{product.id}</td>
//                             <td>{product.name}</td>
//                             <td>
//                                 {product.image_url && (
//                                     <img src={product.image_url} alt={product.name} style={{ width: '100px', height: 'auto' }} />
//                                 )}
//                             </td>
//                             <td>{product.price}</td>
//                             <td>{product.quantity}</td>
//                             <td>{product.sold}</td>
//                             <td>{product.stock}</td>
//                             <td>{product.description}</td>
//                             <td>{product.draw_date}</td>
//                             <td>{product.reward ? product.reward.name : 'N/A'}</td>
//                             <td>
//                                 <Link to={`/admin/products/${product.id}/edit/`} className="btn btn-warning btn-sm me-2">Edit</Link>
//                                 <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default ProductsList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

function ProductsList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/products', {
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
                await axios.delete(`http://localhost:8000/api/admin/products/${id}`, {
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
                <div className="col-md-3">
                    <Sidebar /> {/* Add Sidebar */}
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <h1>Products List</h1>
                        <Link to="/admin/products/create" className="btn btn-primary mb-3">Add New Product</Link>
                        <table className="table">
                            <thead>
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
                                            {product.image_url && (
                                                <img src={product.image_url} alt={product.name} style={{ width: '100px', height: 'auto' }} />
                                            )}
                                        </td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.sold}</td>
                                        <td>{product.stock}</td>
                                        <td>{product.description}</td>
                                        <td>{product.draw_date}</td>
                                        <td>{product.reward ? product.reward.name : 'N/A'}</td>
                                        <td>
                                            <Link to={`/admin/products/${product.id}/edit/`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                            <button onClick={() => handleDelete(product.id)} className="btn btn-danger btn-sm">Delete</button>
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

export default ProductsList;
