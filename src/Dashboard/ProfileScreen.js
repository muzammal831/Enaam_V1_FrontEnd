import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../UserSide/Components/HeaderComponent'; // Import Header
import Footer from '../UserSide/Components/FooterCompnent'; // Import Footer
import Logout from './Logout';
import { useApp } from '../UserSide/Services/AppContext';
import Loader from '../UserSide/Components/LoaderComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function ProfileScreen() {
    const { userData, logout } = useApp();
    const navigate = useNavigate();
    const [user, setUser] = useState();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        if (userData) {
            setUser(userData || {});
            setName(userData.name || '');
            setEmail(userData.email || '');
            setPhone(userData.phone || '');
        }
    }, [userData]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://3.138.38.248/Enaam_Backend_V1/public/api/user', {
                name,
                email,
                phone,
                password,
                password_confirmation: passwordConfirmation
            }, {
                headers: {
                    Authorization: `Bearer ${userData.token}`
                }
            });
            setUser(response.data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            toast.error('Error updating profile.');
        }
    };

    return (
        <div className="App pt-5">
            <Header /> {/* Add Header */}
            <div className="container-fluid mt-5">
                <ToastContainer />
                    <div className="row justify-content-start text-start mt-5">
                        <div className="col-md-12 col-lg-12 mt-5">
                            <div className="card rounded p-4 glow" style={{marginBottom:"30px"}}>
                                <div className="card-header text-start glow">
                                    <h1 className="mb-0 text-left">{user?.name}</h1>
                                </div>
                                <div className="card-body" > 
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
                                        <button className='btn btn-danger w-25 ml-3' onClick={() => { 
                                            logout()
                                            navigate("/") }}>Logout</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
            <Footer /> {/* Add Footer */}
        </div>
    );
}

export default ProfileScreen;
