import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidebar from './sidebar/Sidebar';
import Loader from '../UserSide/Components/LoaderComponent';

function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`http://3.138.38.248/Enaam_Backend_V1/public/api/users/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone || '');
            } catch (error) {
                console.error(error);
                toast.error(`Error fetching user: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://3.138.38.248/Enaam_Backend_V1/public/api/users/${id}`, {
                name,
                email,
                phone,
                password,
                password_confirmation: passwordConfirmation
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            toast.success('User updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error(error);
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || 'Failed to update user.'}`);
            } else if (error.request) {
                toast.error('Error: No response from the server.');
            } else {
                toast.error(`Error: ${error.message}`);
            }
        }
    };

    const handlePromoteToAdmin = async () => {
        try {
            await axios.put(`http://3.138.38.248/Enaam_Backend_V1/public/api/users/${id}/promote`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            toast.success('User promoted to admin!');
            setUser(prevUser => ({ ...prevUser, role: 'admin' })); // Update local state
        } catch (error) {
            console.error(error);
            if (error.response) {
                toast.error(`Error: ${error.response.data.message || 'Failed to promote user.'}`);
            } else if (error.request) {
                toast.error('Error: No response from the server.');
            } else {
                toast.error(`Error: ${error.message}`);
            }
        }
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="p-4">
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader />
                            </div>
                        ) : (
                            <div>
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <h1>Edit User</h1>
                                </div>
                                
                                <form onSubmit={handleUpdate} className="border p-4 rounded bg-light shadow-sm">
                                    <h1 className="mb-0">{user.name}</h1>
                                    <p className="card-text text-center">{user.email}</p>
                                    <p className="card-text text-center">{user.phone}</p>
                                 
                                    <div className="mb-3">
                                        <label htmlFor="name" className="form-label">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            placeholder="Email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="phone" className="form-label">Phone</label>
                                        <input
                                            type="text"
                                            id="phone"
                                            placeholder="Phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label">Password</label>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Password"
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="passwordConfirmation"
                                            placeholder="Confirm Password"
                                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Update</button>
                                    <button type="button" className="btn btn-secondary ms-2" onClick={handlePromoteToAdmin}>
                                        Promote to Admin
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
}

export default UserEdit;
