// // src/components/UserEdit.js

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function UserEdit() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [user, setUser] = useState({});
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordConfirmation, setPasswordConfirmation] = useState('');

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/admin/users/${id}`, {
//                     headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//                 });
//                 setUser(response.data);
//                 setName(response.data.name);
//                 setEmail(response.data.email);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchUser();
//     }, [id]);

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:8000/api/admin/users/${id}`, {
//                 name,
//                 email,
//                 password,
//                 password_confirmation: passwordConfirmation
//             }, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             navigate('/admin/dashboard');
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <h1>Edit User</h1>
//             <form onSubmit={handleUpdate}>
//                 <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//                 <input type="password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirmation(e.target.value)} />
//                 <button type="submit">Update</button>
//             </form>
//         </div>
//     );
// }

// export default UserEdit;

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
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/admin/users/${id}`, {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setUser(response.data);
                setName(response.data.name);
                setEmail(response.data.email);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/admin/users/${id}`, {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation
            }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            navigate('/admin/dashboard');
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
