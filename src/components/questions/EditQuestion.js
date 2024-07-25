// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';

// function EditQuestion() {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [question, setQuestion] = useState(null);
//     const [formData, setFormData] = useState({
//         question_text: '',
//         option1: '',
//         option2: '',
//         option3: '',
//         right_option: '',
//     });

//     useEffect(() => {
//         const fetchQuestion = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:8000/api/admin/questions/${id}`, {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`,
//                     },
//                 });
//                 setQuestion(response.data);
//                 setFormData({
//                     question_text: response.data.question_text,
//                     option1: response.data.option1,
//                     option2: response.data.option2,
//                     option3: response.data.option3,
//                     right_option: response.data.right_option,
//                 });
//             } catch (error) {
//                 console.error('Error fetching question:', error);
//             }
//         };

//         fetchQuestion();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await axios.put(`http://localhost:8000/api/admin/questions/${id}`, formData, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem('token')}`,
//                 },
//             });
//             navigate('/admin/questions');
//         } catch (error) {
//             console.error('Error updating question:', error);
//         }
//     };

//     if (!question) return <div>Loading...</div>;

//     return (
//         <div className="container mt-5">
//             <h1>Edit Question</h1>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label">Question Text</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="question_text"
//                         value={formData.question_text}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Option 1</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="option1"
//                         value={formData.option1}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Option 2</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="option2"
//                         value={formData.option2}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Option 3</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="option3"
//                         value={formData.option3}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Correct Option</label>
//                     <input
//                         type="text"
//                         className="form-control"
//                         name="right_option"
//                         value={formData.right_option}
//                         onChange={handleChange}
//                         required
//                     />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Update Question</button>
//             </form>
//         </div>
//     );
// }

// export default EditQuestion;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar'; // Ensure this is the correct path

function EditQuestion() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [formData, setFormData] = useState({
        question_text: '',
        option1: '',
        option2: '',
        option3: '',
        right_option: '',
    });

    useEffect(() => {
        const fetchQuestion = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/admin/questions/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                setQuestion(response.data);
                setFormData({
                    question_text: response.data.question_text,
                    option1: response.data.option1,
                    option2: response.data.option2,
                    option3: response.data.option3,
                    right_option: response.data.right_option,
                });
            } catch (error) {
                console.error('Error fetching question:', error);
            }
        };

        fetchQuestion();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/admin/questions/${id}`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            navigate('/admin/questions');
        } catch (error) {
            console.error('Error updating question:', error);
        }
    };

    if (!question) return <div className="container mt-5">Loading...</div>;

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-3">
                    <Sidebar />
                </div>
                <div className="col-md-9">
                    <div className="form-container mt-5 p-4 bg-white rounded shadow-sm">
                        <h1 className="mb-4">Edit Question</h1>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="question_text" className="form-label">Question Text</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="question_text"
                                    name="question_text"
                                    value={formData.question_text}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="option1" className="form-label">Option 1</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="option1"
                                    name="option1"
                                    value={formData.option1}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="option2" className="form-label">Option 2</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="option2"
                                    name="option2"
                                    value={formData.option2}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="option3" className="form-label">Option 3</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="option3"
                                    name="option3"
                                    value={formData.option3}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="right_option" className="form-label">Correct Option</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="right_option"
                                    name="right_option"
                                    value={formData.right_option}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">Update Question</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditQuestion;
