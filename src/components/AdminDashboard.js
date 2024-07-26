// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function AdminDashboard() {
//     const [users, setUsers] = useState([]);
//     const [totalUsers, setTotalUsers] = useState(0);

//     useEffect(() => {
//         const fetchUsers = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/admin/users', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 // Filter out users with the role of "admin"
//                 const filteredUsers = response.data.filter(user => user.role !== 'admin');
//                 setUsers(filteredUsers);
//                 setTotalUsers(filteredUsers.length); // Set the total number of users
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchUsers();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8000/api/admin/users/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             setUsers(users.filter(user => user.id !== id));
//             setTotalUsers(totalUsers - 1); // Update total users count after deletion
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
        
        
//         <div className="container-fluid mt-5">
//             <div className="mb-4 p-3 shadow rounded bg-light">
//                 <h3>Total Users: {totalUsers}</h3>
//             </div>
//             <h1 className="mb-4">Admin Dashboard</h1>
//             <table className="table table-striped table-bordered">
//                 <thead>
//                     <tr>
//                         <th>SR No.</th>
//                         <th>Name</th>
//                         <th>Email</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user, index) => (
//                         <tr key={user.id}>
//                             <td>{index + 1}</td>
//                             <td>
//                                 <Link to={`/admin/users/${user.id}`} className="text-decoration-none">
//                                     {user.name}
//                                 </Link>
//                             </td>
//                             <td>{user.email}</td>
//                             <td>
//                                 <Link to={`/admin/users/${user.id}`} className="text-decoration-none">
//                                     <button 
//                                         className="btn btn-primary btn-sm" 
//                                     >
//                                         Edit
//                                     </button>
//                                 </Link>
//                                 <button 
//                                     className="btn btn-danger btn-sm ms-2" 
//                                     onClick={() => handleDelete(user.id)}
//                                 >
//                                     Delete
//                                 </button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// }

// export default AdminDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar'; // Import Sidebar component
import './AdminDashboard.css'; // Import CSS for styling

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                // Filter out users with the role of "admin"
                const filteredUsers = response.data.filter(user => user.role !== 'admin');
                setUsers(filteredUsers);
                setTotalUsers(filteredUsers.length); // Set the total number of users
            } catch (error) {
                console.error(error);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUsers(users.filter(user => user.id !== id));
            setTotalUsers(totalUsers - 1); // Update total users count after deletion
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="admin-dashboard">
            <Sidebar /> {/* Include the Sidebar component */}
            <div className="dashboard-content">
                <div className="total-users-box">
                    <h3>Total Users: {totalUsers}</h3>
                </div>
                <h1 className="mb-4">Admin Dashboard</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>SR No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/admin/users/${user.id}`} className="text-decoration-none">
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.email}</td>
                                <td>
                                    <Link to={`/admin/users/${user.id}`} className="text-decoration-none">
                                        <button 
                                            className="btn btn-primary btn-sm" 
                                        >
                                            Edit
                                        </button>
                                    </Link>
                                    <button 
                                        className="btn btn-danger btn-sm ms-2" 
                                        onClick={() => handleDelete(user.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminDashboard;
