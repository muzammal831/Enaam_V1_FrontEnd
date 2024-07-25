import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import UserInfo from './components/UserInfo';
import ForgotPassword from './components/ForgotPassword'; // Import ForgotPassword component
import ResetPassword from './components/ResetPassword'; // Import ResetPassword component
import AdminDashboard from './components/AdminDashboard';
import UserEdit from './components/UserEdit';
import RewardCreate from './components/rewards/RewardCreate';
import RewardEdit from './components/rewards/RewardEdit';
import RewardsList from './components/rewards/RewardsList';
import Sidebar from './components/sidebar/Sidebar';
import ProductsList from './components/products/ProductsList';
import NewProduct from './components/products/NewProduct';
import EditProduct from './components/products/EditProduct';
import AddQuestion from './components/questions/AddQuestion'; // Import AddQuestion component
import AnswerQuestion from './components/questions/AnswerQuestion'; // Import AnswerQuestion component
import QuestionList from './components/questions/QuestionList'; // Import QuestionList component

import EditQuestion from './components/questions/EditQuestion';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/user" element={<UserInfo />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
                
                {/* Admin Routes */}
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                ?<Route path="/admin/users/:id" element={<UserEdit />} />
                <Route path="/admin/rewards" element={<RewardsList />} />
                        <Route path="/admin/rewards/create" element={<RewardCreate />} />
                        <Route path="/admin/rewards/:id/edit" element={<RewardEdit />} />
                <Route path="/" element={<h1>Welcome to Laravel React App</h1>} />
                <Route path="/admin/products" element={<ProductsList />} /> {/* Add ProductsList route */}
                <Route path="/admin/products/create" element={<NewProduct />} /> {/* Route for creating a new product */}
                <Route path="/admin/products/:id/edit" element={<EditProduct />} /> {/* Route for editing an existing product */}
                
                <Route path="/admin/questions" element={<QuestionList />} /> {/* Route for listing questions */}
                <Route path="/admin/questions/add" element={<AddQuestion />} /> {/* Route for adding a new question */}
                <Route path="/admin/questions/:id/answer" element={<AnswerQuestion />} /> {/* Route for answering a question */}
                <Route path="/admin/questions/:id/edit" element={<EditQuestion />} /> 
            </Routes>
        </Router>
    );
}

export default App;
