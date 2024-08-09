

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from './sidebar/Sidebar';
import Loader from '../UserSide/Components/LoaderComponent'; // Adjust the import path if necessary
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import Header from './sidebar/Header';

function AdminDashboard() {
    const [users, setUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortedUsers, setSortedUsers] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true); // Set loading to true before fetching
            try {
                const response = await axios.get('http://3.138.38.248/Enaam_Backend_V1/public/api/users', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setUsers(response.data); // Set all users, including admins
                setTotalUsers(response.data.length);
                setSortedUsers(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };
        fetchUsers();
    }, []);

    useEffect(() => {
        const filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSortedUsers(filteredUsers);
    }, [searchTerm, users]);

    const handleDelete = async () => {
        try {
            await axios.delete(`http://3.138.38.248/Enaam_Backend_V1/public/api/users/${userToDelete}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setUsers(users.filter(user => user.id !== userToDelete));
            setTotalUsers(totalUsers - 1);
            setShowDeleteModal(false);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12 mt-3'} ms-auto`}>
                    
                    <Header />
                    <div className="dashboard-content p-4">
                        <div className="total-users-box mb-4 p-3 bg-light rounded shadow-sm">
                            <h3 className="mb-0">Total Users: {totalUsers}</h3>
                        </div>
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="form-control mb-4"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <Loader /> {/* Display loader while data is being fetched */}
                            </div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-hover table-striped table-bordered shadow-sm">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>SR No.</th>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Phone</th>
                                            <th>Role</th> {/* Add Role Column */}
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedUsers.length ? (
                                            sortedUsers.map((user, index) => (
                                                <tr key={user.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.phone}</td>
                                                    <td>{user.role}</td> {/* Display Role */}
                                                    <td className="text-center">
                                                        <Link 
                                                            to={`/dashboard/users/${user.id}`} 
                                                            className="btn btn-primary btn-sm me-2"
                                                        >
                                                            <i className="bi bi-pencil"></i>
                                                        </Link>
                                                        <button 
                                                            className="btn btn-danger btn-sm me-2"
                                                            onClick={() => {
                                                                setUserToDelete(user.id);
                                                                setShowDeleteModal(true);
                                                            }}
                                                        >
                                                            <i className="bi bi-trash"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="6" className="text-center">No users found</td> {/* Adjust colspan */}
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        )}

                        {/* Delete Confirmation Modal */}
                        {showDeleteModal && (
                            <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1" role="dialog">
                                <div className="modal-dialog" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">Confirm Deletion</h5>
                                            <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                                        </div>
                                        <div className="modal-body">
                                            <p>Are you sure you want to delete this user?</p>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-primary" onClick={() => setShowDeleteModal(false)}>
                                                Cancel
                                            </button>
                                            <button type="button" className="btn btn-danger" onClick={handleDelete}>
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
