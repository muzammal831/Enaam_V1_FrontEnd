// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import Sidebar from '../sidebar/Sidebar'; // Adjust the path as necessary
// import Loader from '../../UserSide/Components/LoaderComponent'; // Adjust the path if necessary
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const ParticipantsList = () => {
//     const [participants, setParticipants] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(true);

//     useEffect(() => {
//         const fetchParticipants = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/participants', {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem('token')}`
//                     }
//                 });
//                 setParticipants(response.data);
//             } catch (error) {
//                 console.error('Error fetching participants:', error);
//                 toast.error(`Error fetching participants: ${error.response?.data?.message || error.message}`);
//             } finally {
//                 setLoading(false);
//             }
//         };
//         fetchParticipants();
//     }, []);

//     const handleSidebarToggle = (isOpen) => {
//         setIsSidebarOpen(isOpen);
//     };

//     if (loading) return (
//         <div className="container-fluid">
//             <div className="row">
//                 <Sidebar onToggleSidebar={handleSidebarToggle} />
//                 <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
//                     <div className="dashboard-content p-4">
//                         <div className="d-flex justify-content-center">
//                             <Loader /> {/* Assuming you have a Loader component */}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );

  
//     return (
//         <div className="container-fluid">
//             <div className="row">
//                 <Sidebar onToggleSidebar={handleSidebarToggle} />
//                 <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
//                     <div className="dashboard-content p-4">
//                         <div className="d-flex justify-content-between align-items-center mb-4">
//                             <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">Participants List</h1>
//                         </div>

//                         <div className="table-responsive">
//                             <table className="table table-hover table-striped table-bordered shadow-sm rounded">
//                                 <thead className="table-dark">
//                                     <tr>
//                                         <th>Invoice ID</th>
//                                         <th>Total Amount</th>
//                                         <th>User Number</th>
//                                         <th>Payment Response</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {participants.map(participant => (
//                                         <tr key={participant.id}>
//                                             <td>{participant.invoice_id}</td>
//                                             <td>{Number(participant.total_amount).toFixed(2)}</td>
//                                             <td>{participant.userNumber}</td>
//                                             <td>
//                                                 <pre>{JSON.stringify(participant.payment_response, null, 2)}</pre>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </table>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
//         </div>
//     );
// };

// export default ParticipantsList;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar'; // Adjust the path as necessary
import Loader from '../../UserSide/Components/LoaderComponent'; // Adjust the path if necessary
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ParticipantsList = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
        const fetchParticipants = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/participants', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setParticipants(response.data);
            } catch (error) {
                console.error('Error fetching participants:', error);
                toast.error(`Error fetching participants: ${error.response?.data?.message || error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchParticipants();
    }, []);

    const handleSidebarToggle = (isOpen) => {
        setIsSidebarOpen(isOpen);
    };

    if (loading) return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <div className="d-flex justify-content-center">
                            <Loader /> {/* Assuming you have a Loader component */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar onToggleSidebar={handleSidebarToggle} />
                <div className={`col ${isSidebarOpen ? 'col-md-10' : 'col-md-12'} ms-auto`}>
                    <div className="dashboard-content p-4">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h1 className="fs-3 fw-bold text-dark shadow-sm p-3 mb-2 bg-body rounded">Participants List</h1>
                        </div>

                        <div className="table-responsive">
                            {participants.length > 0 ? (
                                <table className="table table-hover table-striped table-bordered shadow-sm rounded">
                                    <thead className="table-dark">
                                        <tr>
                                            <th>Invoice ID</th>
                                            <th>Total Amount</th>
                                            <th>User Number</th>
                                            <th>Payment Response</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {participants.map(participant => (
                                            <tr key={participant.id}>
                                                <td>{participant.invoice_id}</td>
                                                <td>{Number(participant.total_amount).toFixed(2)}</td>
                                                <td>{participant.userNumber}</td>
                                                <td>
                                                    <pre>{JSON.stringify(participant.payment_response, null, 2)}</pre>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="text-center">
                                    <p className="fs-5 text-danger">No participants found</p>
                                    <table className="table table-hover table-striped table-bordered shadow-sm rounded">
                                        <thead className="table-dark">
                                            <tr>
                                                <th>Invoice ID</th>
                                                <th>Total Amount</th>
                                                <th>User Number</th>
                                                <th>Payment Response</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan="4" className="text-center">No data available</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <ToastContainer /> {/* Add ToastContainer to show toast notifications */}
        </div>
    );
};

export default ParticipantsList;
