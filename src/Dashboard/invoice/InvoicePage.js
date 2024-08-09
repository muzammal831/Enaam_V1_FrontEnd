


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Adjust the import path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const InvoicePage = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchInvoices = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/invoices', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                setInvoices(response.data.invoices); // Set invoices
                setLoading(false);
            } catch (error) {
                console.error('Error fetching invoices:', error);
                toast.error(`Error fetching invoices: ${error.response?.data?.message || error.message}`);
                setLoading(false);
            }
        };
        fetchInvoices();
    }, []);

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">Invoices</h1>

                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader /> {/* Assuming you have a Loader component */}
                            </div>
                        ) : (
                            <div className="table-responsive mt-2">
                                <table className="table table-striped table-bordered shadow-sm rounded">
                                    <thead className="table-dark">
                                        <tr>
                                          
                                            <th>Ticket_ID</th>
                                          
                                            <th>User Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Total Quantity</th>
                                            <th>Total Price</th>
                                            <th>Date</th>
                                            <th>Question</th>
                                            <th>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {invoices.length === 0 ? (
                                            <tr>
                                                <td colSpan="8" className="text-center">No invoices found</td>
                                            </tr>
                                        ) : (
                                            invoices.map(invoice => (
                                                <tr key={invoice.id}>
                                          
                                                  <td>{invoice.invoice_id}</td>
                                                    
                                                    <td>{invoice.user ? invoice.user.name : 'N/A'}</td>
                                                    <td>{invoice.user ? invoice.user.email : 'N/A'}</td>
                                                    <td>{invoice.user ? invoice.user.phone : 'N/A'}</td>
                                                    <td>{invoice.total_quantity}</td>
                                                    <td>{Number(invoice.total_price).toFixed(2)}</td>
                                                    <td>{new Date(invoice.created_at).toLocaleDateString()}</td>
                                           
                                           <td>{invoice.is_correct}</td>
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

            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
};

export default InvoicePage;
