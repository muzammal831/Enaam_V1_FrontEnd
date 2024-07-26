import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import UserInfo from './UserInfo';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import AdminDashboard from './AdminDashboard';
import UserEdit from './UserEdit';
import RewardCreate from './rewards/RewardCreate';
import RewardEdit from './rewards/RewardEdit';
import RewardsList from './rewards/RewardsList';
import ProductsList from './products/ProductsList';
import NewProduct from './products/NewProduct';
import EditProduct from './products/EditProduct';
import AddQuestion from './questions/AddQuestion';
import AnswerQuestion from './questions/AnswerQuestion';
import QuestionList from './questions/QuestionList';

import EditQuestion from './questions/EditQuestion';
import FAQList from './faqs/FAQList';
import CreateFAQ from './faqs/CreateFAQ';
import EditFAQ from './faqs/EditFAQ';
import AboutUsList from './aboutus/AboutUsList';
import CreateAboutUs from './aboutus/CreateAboutUs';
import EditAboutUs from './aboutus/EditAboutUs';
import BlogList from './blogs/BlogList';
import AddBlog from './blogs/AddBlog';
import EditBlog from './blogs/EditBlog';
import ViewBlog from './blogs/ViewBlog';
import VideoList from './videos/VideoList';
import AddVideo from './videos/AddVideo';
import EditVideo from './videos/EditVideo';
import ViewVideo from './videos/ViewVideo';
import BannerList from './banners/BannerList';
import AddBanner from './banners/AddBanner';
import EditBanner from './banners/EditBanner';
import ViewBanner from './banners/ViewBanner';
import BannerDisplay from './banners/BannerDisplay';


export const Dashboard = () => {
    return (<>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<UserInfo />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Admin Routes */}
        <Route path="/" element={<AdminDashboard />} />
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
    </>
    );
}

