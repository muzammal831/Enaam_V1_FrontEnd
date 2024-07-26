import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

function RewardsList() {
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/admin/rewards', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setRewards(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRewards();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/admin/rewards/${id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setRewards(rewards.filter(reward => reward.id !== id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar /> {/* Add Sidebar */}
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <h1 className="mb-4">Rewards List</h1>
                        <Link to="/admin/rewards/create" className="btn btn-primary mb-3">Add New Reward</Link>
                        <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Description</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {rewards.map(reward => (
                                    <tr key={reward.id}>
                                        <td>{reward.id}</td>
                                        <td>{reward.name}</td>
                                        <td><img src={`http://localhost:8000${reward.image_url}`} alt={reward.name} style={{ width: '100px' }} /></td>
                                        <td>{reward.description}</td>
                                        <td>
                                            <Link to={`/admin/rewards/${reward.id}/edit`} className="btn btn-primary btn-sm">Edit</Link>
                                            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(reward.id)}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RewardsList;
