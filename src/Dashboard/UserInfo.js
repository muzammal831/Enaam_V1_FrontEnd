


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../UserSide/Components/HeaderComponent'; // Import Header
import Footer from '../UserSide/Components/FooterCompnent'; // Import Footer
import Logout from './Logout';

// Custom Loader Component
const Loader = () => (
    <div className="loader">
        <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    </div>
);

function UserInfo() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/user', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
                setPhone(response.data.phone);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/api/user', {
                name,
                email,
                phone,
                password,
                password_confirmation: passwordConfirmation
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setUser(response.data);
            alert('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            alert('Error updating profile.');
        }
    };

    return (
        <div className="App pt-5">
            <Header /> {/* Add Header */}
            <div className="container-fluid mt-5">
                {user ? (
                    <div className="row justify-content-start text-start mt-5">
                        <div  className="col-md-12 col-lg-12 mt-5">
                            <div className="card shadow-lg rounded p-4">
                                <div className="card-header text-start">
                                    <h1 className="mb-0">{user.name}</h1>
                                </div>
                                <div className="card-body">
                                    <p className="card-text text-center">{user.email}</p>
                                    <p className="card-text text-center">{user.phone}</p>
                                    <form onSubmit={handleUpdate}>
                                        <div className="mb-3">
                                            <label htmlFor="name" className="form-label">Name</label>
                                            <input
                                                type="text"
                                                id="name"
                                                className="form-control"
                                                placeholder="Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="email" className="form-label">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control"
                                                placeholder="Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="phone" className="form-label">Phone</label>
                                            <input
                                                type="text"
                                                id="phone"
                                                className="form-control"
                                                placeholder="Phone"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="password" className="form-label">Password</label>
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control"
                                                placeholder="Password"
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="passwordConfirmation" className="form-label">Confirm Password</label>
                                            <input
                                                type="password"
                                                id="passwordConfirmation"
                                                className="form-control"
                                                placeholder="Confirm Password"
                                                onChange={(e) => setPasswordConfirmation(e.target.value)}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary w-25">Update</button>
                                    </form>
                                </div>
                                <div className="card-footer text-center">
                                    <Logout />
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="text-center">
                        <Loader /> {/* Use Custom Loader */}
                    </div>
                )}
            </div>
            <Footer /> {/* Add Footer */}
        </div>
    );
}

export default UserInfo;
