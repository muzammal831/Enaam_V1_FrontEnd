// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Logout from './Logout';

// function UserInfo() {
//     const [user, setUser] = useState(null);
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [passwordConfirmation, setPasswordConfirmation] = useState('');

//     useEffect(() => {
//         const fetchUser = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/user', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 setUser(response.data);
//                 setName(response.data.name);
//                 setEmail(response.data.email);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchUser();
//     }, []);

//     const handleUpdate = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.put('http://localhost:8000/api/user', {
//                 name,
//                 email,
//                 password,
//                 password_confirmation: passwordConfirmation
//             }, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`
//                 }
//             });
//             setUser(response.data);
//             alert('Profile updated successfully!');
//         } catch (error) {
//             console.error(error);
//             alert('Error updating profile.');
//         }
//     };

//     return user ? (
//         <div>
//             <h1>{user.name}</h1>
//             <p>{user.email}</p>
//             <form onSubmit={handleUpdate}>
//                 <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                 <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                 <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
//                 <input type="password" placeholder="Confirm Password" onChange={(e) => setPasswordConfirmation(e.target.value)} />
//                 <button type="submit">Update</button>
//             </form>
//             <Logout />
//         </div>
//     ) : (
//         <p>Loading...</p>
//     );
// }

// export default UserInfo;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logout from './Logout';

function UserInfo() {
    const [user, setUser] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
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

    return user ? (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header">
                    <h1 className="mb-0">{user.name}</h1>
                </div>
                <div className="card-body">
                    <p className="card-text">{user.email}</p>
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
                        <button type="submit" className="btn btn-primary">Update</button>
                    </form>
                </div>
                <div className="card-footer">
                    <Logout />
                </div>
            </div>
        </div>
    ) : (
        <div className="container mt-5">
            <p>Loading...</p>
        </div>
    );
}

export default UserInfo;
