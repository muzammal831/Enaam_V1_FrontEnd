import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../UserSide/Services/AppContext';
import '../UserSide/css/Styles.css';

function Login() {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login  } = useApp()

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            email_or_phone: emailOrPhone,
            password: password
        }

        login(payload).then((response) => {
            setMessage('Login successful!');
            setError('');
            navigate('/dashboard');
        }).catch((error) => {
            setError(error);
        })

    };



    return (
        <div className="container-fluid">
            <div className="row text-start">
                <div className="col-md-12">
                    <div  className="card">
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
                                <button type="submit" className="btn btn-primary w-100">Login</button>
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
