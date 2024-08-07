

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../UserSide/Components/LoaderComponent';
import Sidebar from '../sidebar/Sidebar'; // Import the Sidebar component
import './Styles.css'; // Ensure this CSS file is imported

const ContactList = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/contacts', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setContacts(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching contacts:', error);
                setLoading(false);
            }
        };

        fetchContacts();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <Sidebar />
                </div>
                <div className="col-md-10 mt-5">
                    <h1 className="text-center mb-4">Contact List</h1>
                    {loading ? (
                        <Loader />
                    ) : (
                        <div className="table-responsive mt-2">
                            <table className="table table-striped">
                                <thead className="table-dark">
                                    <tr>
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
    );
};

export default ContactList;
