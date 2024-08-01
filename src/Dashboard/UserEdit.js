

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar'; // Adjust the import path if necessary
import './UserEdit.css'; // Import CSS for styling
function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState(''); // Added phone state
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone || ''); // Set phone data
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [id]);
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/users/${id}`, {
                name,
                email,
                phone, // Include phone in the update request
                password,
                password_confirmation: passwordConfirmation
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="admin-page">
            <Sidebar />
            <div className="content">
                <div className="user-edit-container">
                    <h1>Edit User</h1>
                    <form onSubmit={handleUpdate} className="user-edit-form">
                        <input
                            type="text"
                            placeholder="Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="form-input"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="form-input"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)} // Handle phone input
                            className="form-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="form-input"
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                            className="form-input"
                        />
                        <button type="submit" className="submit-button">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default UserEdit;