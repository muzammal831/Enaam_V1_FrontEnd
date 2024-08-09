


import React, { useState } from 'react';
import axios from 'axios';
import Header from '../UserSide/Components/HeaderComponent'; // Import Header
import Footer from '../UserSide/Components/FooterCompnent'; // Import Footer

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/forgot-password', {
                email
            });
            setMessage(response.data.message);
            setError('');
        } catch (error) {
            setError('Failed to send reset link.');
            setMessage('');
        }
    };

    return (
        <div className="App">
            <Header /> {/* Add Header */}
            <div className="container mt-5">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-6 col-lg-6 mt-5">
                        <div className="card p-4 shadow-lg rounded">
                            <h2 className="mb-4 text-center">Forgot Password</h2>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Enter your email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Send Password Reset Link</button>
                            </form>
                            {message && <p className="mt-3 text-success text-center">{message}</p>}
                            {error && <p className="mt-3 text-danger text-center">{error}</p>}
                        </div>
                    </div>
                </div>
            </div>
            <Footer /> {/* Add Footer */}
        </div>
    );
}

export default ForgotPassword;
