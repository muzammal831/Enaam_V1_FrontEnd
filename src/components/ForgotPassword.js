

import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://3.138.38.248/Enaam_Backend_V1/public/api/forgot-password', {
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
        <div className="container mt-5">
            <div className="card p-4 shadow-sm">
                <h2 className="mb-4">Forgot Password</h2>
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
                    <button type="submit" className="btn btn-primary">Send Password Reset Link</button>
                </form>
                {message && <p className="mt-3 text-success">{message}</p>}
                {error && <p className="mt-3 text-danger">{error}</p>}
            </div>
        </div>
    );
}

export default ForgotPassword;
