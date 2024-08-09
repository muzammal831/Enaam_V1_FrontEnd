import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component
import Loader from '../../UserSide/Components/LoaderComponent'; // Import Loader component
import { ToastContainer, toast } from 'react-toastify'; // Import ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const ParticipantDetails = () => {
    const { id } = useParams();
    const [participant, setParticipant] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar state

    useEffect(() => {
        const fetchParticipant = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/participants/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (response.status === 200) {
                    setParticipant(response.data);
                } else {
                    toast.error('Failed to fetch participant details.');
                }
            } catch (error) {
                console.error('Error fetching participant:', error.response ? error.response.data : error.message);
                toast.error('Error fetching participant details.');
            } finally {
                setLoading(false);
            }
        };
        fetchParticipant();
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

    if (!participant) {
        return <p className="text-center text-danger">No participant found</p>;
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow p-3 mb-2 bg-light rounded">
                                Participant Details
                            </h1>
                            <Link to="/dashboard/participants" className="btn btn-secondary shadow-sm">
                                <i className="bi bi-arrow-left me-2"></i> Back to Participants List
                            </Link>
                        </div>

                        <div className="card shadow-lg border-0 rounded">
                            <div className="card-body">
                                <h5 className="card-title">Participant ID: {participant.id}</h5>
                                <p><strong>Invoice ID:</strong> {participant.invoice_id}</p>
                                <p><strong>Total Amount:</strong> ${Number(participant.total_amount).toFixed(2)}</p>
                                <p><strong>User Number:</strong> {participant.userNumber}</p>
                                <p><strong>Payment Response:</strong></p>
                                <pre>{JSON.stringify(participant.payment_response, null, 2)}</pre>
                            </div>
                        </div>

                        <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ParticipantDetails;
