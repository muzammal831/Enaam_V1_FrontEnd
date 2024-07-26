// // src/components/faqs/FAQList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function FAQList() {
//     const [faqs, setFaqs] = useState([]);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchFaqs = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/faqs', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setFaqs(response.data);
//             } catch (error) {
//                 console.error('Error fetching FAQs:', error);
//             }
//         };

//         fetchFaqs();
//     }, []);

//     const handleEditClick = (id) => {
//         navigate(`/faqs/${id}/edit`);
//     };

//     const handleDeleteClick = async (id) => {
//         try {
//             await axios.delete(`http://localhost:8000/api/faqs/${id}`, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             setFaqs(faqs.filter(faq => faq.id !== id));
//         } catch (error) {
//             console.error('Error deleting FAQ:', error);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <h1>FAQ List</h1>
//             <table className="table">
//                 <thead>
//                     <tr>
//                         <th>Question</th>
//                         <th>Answer</th>
//                         <th>Actions</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {faqs.map((faq) => (
//                         <tr key={faq.id}>
//                             <td>{faq.question}</td>
//                             <td>{faq.answer}</td>
//                             <td>
//                                 <button 
//                                     className="btn btn-warning mr-2" 
//                                     onClick={() => handleEditClick(faq.id)}>
//                                     Edit
//                                 </button>
//                                 <button 
//                                     className="btn btn-danger" 
//                                     onClick={() => handleDeleteClick(faq.id)}>
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

// export default FAQList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function FAQList() {
    const [faqs, setFaqs] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/faqs', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setFaqs(response.data);
            } catch (error) {
                console.error('Error fetching FAQs:', error);
            }
        };

        fetchFaqs();
    }, []);

    const handleEditClick = (id) => {
        navigate(`/faqs/${id}/edit`);
    };

    const handleDeleteClick = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/faqs/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setFaqs(faqs.filter(faq => faq.id !== id));
        } catch (error) {
            console.error('Error deleting FAQ:', error);
        }
    };

    const handleAddClick = () => {
        navigate('/faqs/create');
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="container mt-5">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1>FAQ List</h1>
                            <button
                                className="btn btn-success"
                                onClick={handleAddClick}
                            >
                                Add New FAQ
                            </button>
                        </div>
                        <div className="bg-white p-4 rounded shadow-sm">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Question</th>
                                        <th>Answer</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {faqs.map((faq) => (
                                        <tr key={faq.id}>
                                            <td>{faq.question}</td>
                                            <td>{faq.answer}</td>
                                            <td>
                                                <button 
                                                    className="btn btn-warning me-2" 
                                                    onClick={() => handleEditClick(faq.id)}>
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn btn-danger" 
                                                    onClick={() => handleDeleteClick(faq.id)}>
                                                    Delete
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

export default FAQList;
