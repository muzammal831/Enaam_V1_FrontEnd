

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';

const InvoiceDetailsPage = () => {
    const { id } = useParams();
    const [invoice, setInvoice] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/invoices/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('Fetched Invoice:', response.data);
                setInvoice(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching invoice:', error);
                setLoading(false);
            }
        };
        fetchInvoice();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!invoice) return <p>No invoice found</p>;

    // Handle invoice_id and ticket_id if they are not arrays
    const parseJson = (data) => {
        try {
            return JSON.parse(data);
        } catch (e) {
            return [];
        }
    };

    const invoiceIds = Array.isArray(invoice.invoice_id) ? invoice.invoice_id : parseJson(invoice.invoice_id || '[]');
    const ticketIds = Array.isArray(invoice.ticket_id) ? invoice.ticket_id : parseJson(invoice.ticket_id || '[]');

    const products = invoice.products || [];

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-5">
                    <h1>Invoice Details</h1>
                    <div className="card mb-3 mt-3">
                        <div className="card-header bg-primary text-white">
                            Invoice #{invoice.id}
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">User Information</h5>
                            <p><strong>Invoice IDs:</strong> {invoice.invoice_id}</p>
                            <p><strong>Tickets:</strong> {ticketIds.length > 0 ? ticketIds.join(', ') : 'N/A'}</p>
                            <p><strong>User Name:</strong> {invoice.user ? invoice.user.name : 'N/A'}</p>
                            <p><strong>Email:</strong> {invoice.user ? invoice.user.email : 'N/A'}</p>
                            <p><strong>Phone:</strong> {invoice.user ? invoice.user.phone : 'N/A'}</p>

                            <h5 className="card-title mt-4">Product Information</h5>
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <div key={index} className="mb-3">
                                        <p className="card-text"><strong>Ticket ID:</strong> {product.ticket_id}</p>
                                        <p className="card-text"><strong>Product Name:</strong> {product.name}</p>
                                        <p className="card-text"><strong>Reward:</strong> {product.reward ? product.reward.name : 'N/A'}</p>
                                        <p className="card-text"><strong>Quantity:</strong> {product.quantity}</p>
                                        <p className="card-text"><strong>Price:</strong> {Number(product.price).toFixed(2)}</p>
                                    </div>
                                ))
                            ) : (
                                <p>No products found</p>
                            )}
                            <p className="card-text"><strong>Total Quantity:</strong> {invoice.total_quantity}</p>
                            <p className="card-text"><strong>Total Price:</strong> {Number(invoice.total_price).toFixed(2)}</p>
                            <p className="card-text"><strong>Question:</strong> {invoice.is_correct}</p>
                            <p className="card-text"><strong>Date:</strong> {new Date(invoice.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetailsPage;
