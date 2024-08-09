


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path
import Loader from '../../UserSide/Components/LoaderComponent'; // Adjust the import path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Styles.css'; // Ensure this CSS file is imported

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/contacts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setContacts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                toast.error(`Error fetching contacts: ${error.response?.data?.message || error.message}`);
                setLoading(false);
            }
        };

        fetchContacts();
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
                        <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-4 bg-body rounded">Contact List</h1>
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader /> {/* Assuming you have a Loader component */}
                            </div>
                        ) : (
                            <div className="table-responsive mt-2">
                                <table className="table table-striped table-bordered shadow-sm rounded">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Sr.</th>
                                            
                                            <th>Username</th>
                                            <th>Email</th>
                                            <th>Message</th>
                                            <th>Date Submitted</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contacts.length === 0 ? (
                                            <tr>
                                                <td colSpan="4" className="text-center">No contacts found</td>
                                            </tr>
                                        ) : (
                                            contacts.map((contact, index) => (
                                                <tr key={index}>
                                                  <td>{index + 1}</td>
                                                    <td>{contact.username}</td>
                                                    <td>{contact.email}</td>
                                                    <td>{contact.message}</td>
                                                    <td>{new Date(contact.created_at).toLocaleDateString()}</td>
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

export default ContactList;
