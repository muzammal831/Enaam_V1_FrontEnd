// src/pages/InvoiceDetailsPage.js

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
                            <p className="card-text"><strong>User Name:</strong> {invoice.user.name}</p>
                            <p className="card-text"><strong>Email:</strong> {invoice.user.email}</p>
                            <p className="card-text"><strong>Phone:</strong> {invoice.user.phone}</p>

                            <h5 className="card-title mt-4">Product Information</h5>
                            <p className="card-text"><strong>Product:</strong> {invoice.product.name}</p>
                            <p className="card-text"><strong>Reward:</strong> {invoice.product.reward.name}</p>
                            <p className="card-text"><strong>Quantity:</strong> {invoice.quantity}</p>
                            <p className="card-text"><strong>Price:</strong> {Number(invoice.price).toFixed(2)}</p>
                            <p className="card-text"><strong>Total Price:</strong> {Number(invoice.total_price).toFixed(2)}</p>
                            <p className="card-text"><strong>Date:</strong> {new Date(invoice.created_at).toLocaleDateString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvoiceDetailsPage;
