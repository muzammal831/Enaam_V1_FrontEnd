import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Import Sidebar component

function CreateReward() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('image', image);

        try {
            await axios.post('http://localhost:8000/api/admin/rewards', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            alert('Reward created successfully!');
            navigate('/admin/rewards'); // Redirect to the rewards list page
        } catch (error) {
            console.error(error);
            alert('Error creating reward.');
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
                        <h1 className="mb-4">Create Reward</h1>
                        <form onSubmit={handleSubmit} encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Name</label>
                                <input type="text" id="name" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Description</label>
                                <textarea id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Image</label>
                                <input type="file" id="image" className="form-control" onChange={(e) => setImage(e.target.files[0])} required />
                            </div>
                            <button type="submit" className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateReward;
