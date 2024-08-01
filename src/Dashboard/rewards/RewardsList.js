// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

// function RewardsList() {
//     const [rewards, setRewards] = useState([]);

//     useEffect(() => {
//         const fetchRewards = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/rewards', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 setRewards(response.data);
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         fetchRewards();
//     }, []);

//     const handleDelete = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8000/api/rewards/${id}`, {
//                 headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
//             });
//             setRewards(rewards.filter(reward => reward.id !== id));
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <div className="col-md-3">
//                     <Sidebar /> {/* Add Sidebar */}
//                 </div>
//                 <div className="col-md-9">
//                     <div className="container mt-5">
//                         <h1 className="mb-4">Rewards List</h1>
//                         <Link to="/dashboard/rewards/create" className="btn btn-primary mb-3">Add New Reward</Link>
//                         <table className="table table-striped table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th>ID</th>
//                                     <th>Name</th>
//                                     <th>Image</th>
//                                     <th>Description</th>
//                                     <th>Actions</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {rewards.map(reward => (
//                                     <tr key={reward.id}>
//                                         <td>{reward.id}</td>
//                                         <td>{reward.name}</td>
//                                         <td><img src={`http://localhost:8000${reward.image_url}`} alt={reward.name} style={{ width: '100px' }} /></td>
//                                         <td>{reward.description}</td>
//                                         <td>
//                                             <Link to={`/dashboard/rewards/${reward.id}/edit`} className="btn btn-primary btn-sm">Edit</Link>
//                                             <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(reward.id)}>Delete</button>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default RewardsList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

function RewardsList() {
    const [rewards, setRewards] = useState([]);

    useEffect(() => {
        const fetchRewards = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/rewards', {
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
            await axios.delete(`http://localhost:8000/api/rewards/${id}`, {
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
                <div className="col-md-2">
                    <Sidebar /> {/* Add Sidebar */}
                </div>
                <div className="col-md-10">
                    <div className="container-fluid mt-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">Rewards List</h1>
                            <Link to="/dashboard/rewards/create" className="btn btn-primary shadow-sm">
                                <i className="bi bi-plus-circle me-2"></i>Add New Reward
                            </Link>
                        </div>
                        <div className="table-responsive">
                            <table className="table table-striped table-bordered shadow-sm rounded">
                                <thead className="table-light">
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
                                            <td>
                                                <img 
                                                    src={reward.image} 
                                                    alt={reward.name} 
                                                    className="img-thumbnail"
                                                    style={{ width: '200px' }} 
                                                />
                                            </td>
                                            <td>{reward.description}</td>
                                            <td>
                                                <Link 
                                                    to={`/dashboard/rewards/${reward.id}/edit`} 
                                                    className="btn btn-primary btn-sm me-2"
                                                >
                                                    <i className="bi bi-pencil"></i>
                                                </Link>
                                                <button 
                                                    className="btn btn-danger btn-sm"
                                                    onClick={() => handleDelete(reward.id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RewardsList;
