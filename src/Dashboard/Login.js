

import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/login', {
                email_or_phone: emailOrPhone,
                password
            });

            // Debugging: Log the entire response
            console.log('API Response:', response.data);

            const { token, role, name, email, phone } = response.data.user;

            // Store token and role in localStorage
            localStorage.setItem('token', token);
            localStorage.setItem('role', role);

            // Display the response in console log
            console.log(`Login successful! 
                \nName: ${name} 
                \nEmail: ${email} 
                \nPhone: ${phone} 
                \nRole: ${role} 
                \nToken: ${token}`);

            setMessage('Login successful!');
            setError('');
            navigate('/dashboard');  // Redirect to dashboard or desired page
        } catch (error) {
            setError('Login failed. Please check your credentials and try again.');
            setMessage('');
            console.error('Login Error:', error.response.data);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row text-start">
                <div className="col-md-12">
                    <div style={{ border: '0px' }} className="card">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="emailOrPhone" className="form-label">Email or Phone</label>
                                    <input
                                        type="text"
                                        id="emailOrPhone"
                                        className="form-control"
                                        placeholder="Enter your email or phone"
                                        onChange={(e) => setEmailOrPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </form>
                            {message && <p className="text-success mt-3">{message}</p>}
                            {error && <p className="text-danger mt-3">{error}</p>}
                            <div style={{ marginLeft: '-10px' }} className="mt-3 text-start d-flex justify-content-start mr-3">
                                <Link to="/dashboard/forgot-password" className="btn btn-link">Forgot Password?</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
