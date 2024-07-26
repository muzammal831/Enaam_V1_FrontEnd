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
import FAQList from './components/faqs/FAQList';
import CreateFAQ from './components/faqs/CreateFAQ';
import EditFAQ from './components/faqs/EditFAQ';
import AboutUsList from './components/aboutus/AboutUsList';
import CreateAboutUs from './components/aboutus/CreateAboutUs';
import EditAboutUs from './components/aboutus/EditAboutUs';
import BlogList from './components/blogs/BlogList';
import AddBlog from './components/blogs/AddBlog';
import EditBlog from './components/blogs/EditBlog';
import ViewBlog from './components/blogs/ViewBlog';
import VideoList from './components/videos/VideoList';
import AddVideo from './components/videos/AddVideo';
import EditVideo from './components/videos/EditVideo';
import ViewVideo from './components/videos/ViewVideo';
import BannerList from './components/banners/BannerList';
import AddBanner from './components/banners/AddBanner';
import EditBanner from './components/banners/EditBanner';
import ViewBanner from './components/banners/ViewBanner';
import BannerDisplay from './components/banners/BannerDisplay';


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
                <Route path="/dashboard" element={<AdminDashboard />} />
                ?<Route path="/users/:id" element={<UserEdit />} />
                <Route path="/rewards" element={<RewardsList />} />
                <Route path="/rewards/create" element={<RewardCreate />} />
                <Route path="/rewards/:id/edit" element={<RewardEdit />} />
                <Route path="/" element={<h1>Welcome to Laravel React App</h1>} />
                <Route path="/products" element={<ProductsList />} /> {/* Add ProductsList route */}
                <Route path="/products/create" element={<NewProduct />} /> {/* Route for creating a new product */}
                <Route path="/products/:id/edit" element={<EditProduct />} /> {/* Route for editing an existing product */}

                <Route path="/questions" element={<QuestionList />} /> {/* Route for listing questions */}
                <Route path="/questions/add" element={<AddQuestion />} /> {/* Route for adding a new question */}
                <Route path="/questions/:id/answer" element={<AnswerQuestion />} /> {/* Route for answering a question */}
                <Route path="/questions/:id/edit" element={<EditQuestion />} />
                <Route path="/faqs" element={<FAQList />} />
                <Route path="/faqs/create" element={<CreateFAQ />} />
                <Route path="/faqs/:id/edit" element={<EditFAQ />} />
                <Route path="/about-us" element={<AboutUsList />} />
                <Route path="/about-us/create" element={<CreateAboutUs />} />
                <Route path="/about-us/:id/edit" element={<EditAboutUs />} />
                <Route path="/blogs" element={<BlogList />} />
                <Route path="/blogs/add" element={<AddBlog />} />
                <Route path="/blogs/:id/edit" element={<EditBlog />} />
                <Route path="/blogs/:id" element={<ViewBlog />} />
                <Route path="/videos" element={<VideoList />} />
                <Route path="/videos/add" element={<AddVideo />} />
                <Route path="/videos/:id/edit" element={<EditVideo />} />
                <Route path="/videos/:id" element={<ViewVideo />} />

                {/* Banners Routes */}
                <Route path="/banners" element={<BannerList />} />
                <Route path="/banners/add" element={<AddBanner />} />
                <Route path="/banners/:id/edit" element={<EditBanner />} />
                <Route path="/banners/:id" element={<ViewBanner />} />
                {/* <Route path="/banners/platform/:platform" element={<BannerDisplay />} /> */}
                <Route path="/banners/desktop" element={<BannerDisplay platform="desktop" />} />
                <Route path="/banners/mobile" element={<BannerDisplay platform="mobile" />} />
                <Route path="/banners/mobilead" element={<BannerDisplay platform="mobilead" />} />
                <Route path="/banners/both" element={<BannerDisplay platform="both" />} />
            </Routes>
        </Router>
    );
}

export default App;
