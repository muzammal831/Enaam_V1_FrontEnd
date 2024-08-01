


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
                const response = await axios.get('http://localhost:8000/api/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                const filteredUsers = response.data.filter(user => user.role !== 'admin');
                setUsers(filteredUsers);
                setTotalUsers(filteredUsers.length);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUsers(users.filter(user => user.id !== id));
            setTotalUsers(totalUsers - 1);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <div className="admin-dashboard d-flex">
            <Sidebar />
            <div className="dashboard-content flex-fill p-4">
                <div className="total-users-box mb-4 p-3">
                    <h3>Total Users: {totalUsers}</h3>
                </div>
                <h1 className="mb-4">Admin Dashboard</h1>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>SR No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>
                                    <Link to={`/users/${user.id}`} className="text-decoration-none">
                                        {user.name}
                                    </Link>
                                </td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td className="text-center">
                                    <Link to={`/dashboard/users/${user.id}`} className="text-decoration-none me-2">
                                        <i className="bi bi-pencil fs-5 text-primary" title="Edit"></i>
                                    </Link>
                                    <i
                                        className="bi bi-trash fs-5 text-danger"
                                        title="Delete"
                                        onClick={() => handleDelete(user.id)}
                                    ></i>
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







