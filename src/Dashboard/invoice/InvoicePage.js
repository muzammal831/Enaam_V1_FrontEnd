

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';

const InvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState('');

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/invoices', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });

                setRole(response.data.role); // Set role from response
                setInvoices(response.data.invoices); // Set invoices
                setLoading(false);
            } catch (error) {
                console.error('Error fetching invoices:', error);
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-5">
                    <h1>Invoices</h1>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <div className="table-responsive mt-2">
                            <table className="table table-striped">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Product ID</th>
                                        <th>Quantity</th>
                                        <th>Price</th>
                                        <th>Total Price</th>
                                        <th>Date</th>
                                        <th>Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {invoices.length === 0 ? (
                                        <tr>
                                            <td colSpan="10">No invoices found</td>
                                        </tr>
                                    ) : (
                                        invoices.map(invoice => (
                                            <tr key={invoice.id}>
                                                <td>{invoice.id}</td>
                                                <td>{invoice.user.name}</td>
                                                <td>{invoice.user.email}</td>
                                                <td>{invoice.user.phone}</td>
                                                <td>{invoice.product_id}</td>
                                                <td>{invoice.quantity}</td>
                                                <td>{Number(invoice.price).toFixed(2)}</td>
                                                <td>{Number(invoice.total_price).toFixed(2)}</td>
                                                <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <Link to={`/dashboard/invoices/${invoice.id}`} className="btn btn-sm btn-primary">
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;
