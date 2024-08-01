// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Register from './Register';
// import Login from './Login';
// import UserInfo from './UserInfo';
// import ForgotPassword from './ForgotPassword';
// import ResetPassword from './ResetPassword';
// import AdminDashboard from './AdminDashboard';
// import UserEdit from './UserEdit';
// import RewardCreate from './rewards/RewardCreate';
// import RewardEdit from './rewards/RewardEdit';
// import RewardsList from './rewards/RewardsList';
// import ProductsList from './products/ProductsList';
// import NewProduct from './products/NewProduct';
// import EditProduct from './products/EditProduct';
// import AddQuestion from './questions/AddQuestion';
// import AnswerQuestion from './questions/AnswerQuestion';
// import QuestionList from './questions/QuestionList';

// import EditQuestion from './questions/EditQuestion';
// import FAQList from './faqs/FAQList';
// import CreateFAQ from './faqs/CreateFAQ';
// import EditFAQ from './faqs/EditFAQ';
// import AboutUsList from './aboutus/AboutUsList';
// import CreateAboutUs from './aboutus/CreateAboutUs';
// import EditAboutUs from './aboutus/EditAboutUs';
// import BlogList from './blogs/BlogList';
// import AddBlog from './blogs/AddBlog';
// import EditBlog from './blogs/EditBlog';
// import ViewBlog from './blogs/ViewBlog';
// import VideoList from './videos/VideoList';
// import AddVideo from './videos/AddVideo';
// import EditVideo from './videos/EditVideo';
// import ViewVideo from './videos/ViewVideo';
// import BannerList from './banners/BannerList';
// import AddBanner from './banners/AddBanner';
// import EditBanner from './banners/EditBanner';
// import ViewBanner from './banners/ViewBanner';
// import BannerDisplay from './banners/BannerDisplay';
// import InvoicePage from './invoice/InvoicePage';
// import InvoiceDetailsPage from './invoice/InvoiceDetailsPage';
// import ContactList from './Contacts/ContactList';


// export const DashboardRoutes = () => {
//     return (  
//         <Routes>
//         <Route path="/dashboard/register" element={<Register />} />
//         <Route path="/dashboard/login" element={<Login />} />
//         <Route path="/dashboard/user" element={<UserInfo />} />
//         <Route path="/dashboard/forgot-password" element={<ForgotPassword />} />
//         <Route path="/dashboard/reset-password/:token" element={<ResetPassword />} />

//         {/* Admin Routes */}
//         <Route path="/dashboard" element={<AdminDashboard />} />
//         ?<Route path="dashboard/users/:id" element={<UserEdit />} />
//         <Route path="/dashboard/rewards" element={<RewardsList />} />
//         <Route path="/dashboard/rewards/create" element={<RewardCreate />} />
//         <Route path="dashboard/rewards/:id/edit" element={<RewardEdit />} />
//         <Route path="/dashboard/products" element={<ProductsList />} /> {/* Add ProductsList route */}
//         <Route path="/dashboard/products/create" element={<NewProduct />} /> {/* Route for creating a new product */}
//         <Route path="/dashboard/products/:id/edit" element={<EditProduct />} /> {/* Route for editing an existing product */}

//         <Route path="/dashboard/questions" element={<QuestionList />} /> {/* Route for listing questions */}
//         <Route path="/dashboard/questions/add" element={<AddQuestion />} /> {/* Route for adding a new question */}
//         <Route path="/dashboard/questions/:id/answer" element={<AnswerQuestion />} /> {/* Route for answering a question */}
//         <Route path="/dashboard/questions/:id/edit" element={<EditQuestion />} />
//         <Route path="/dashboard/faqs" element={<FAQList />} />
//         <Route path="/dashboard/faqs/create" element={<CreateFAQ />} />
//         <Route path="/dashboard/faqs/:id/edit" element={<EditFAQ />} />
//         <Route path="/dashboard/about-us" element={<AboutUsList />} />
//         <Route path="/dashboard/about-us/create" element={<CreateAboutUs />} />
//         <Route path="/dashboard/about-us/:id/edit" element={<EditAboutUs />} />
//         <Route path="/dashboard/blogs" element={<BlogList />} />
//         <Route path="/dashboard/blogs/add" element={<AddBlog />} />
//         <Route path="/dashboard/blogs/:id/edit" element={<EditBlog />} />
//         <Route path="/dashboard/blogs/:id" element={<ViewBlog />} />
//         <Route path="/dashboard/videos" element={<VideoList />} />
//         <Route path="/dashboard/videos/add" element={<AddVideo />} />
//         <Route path="/dashboard/videos/:id/edit" element={<EditVideo />} />
//         <Route path="/dashboard/videos/:id" element={<ViewVideo />} />

//         {/* Banners Routes */}
//         <Route path="/dashboard/banners" element={<BannerList />} />
//         <Route path="/dashboard/banners/add" element={<AddBanner />} />
//         <Route path="/dashboard/banners/:id/edit" element={<EditBanner />} />
//         <Route path="/dashboard/banners/:id" element={<ViewBanner />} />
//         {/* <Route path="/dashboard/banners/platform/:platform" element={<BannerDisplay />} /> */}
//         <Route path="/dashboard/banners/desktop" element={<BannerDisplay platform="desktop" />} />
//         <Route path="/dashboard/banners/mobile" element={<BannerDisplay platform="mobile" />} />
//         <Route path="/dashboard/banners/mobilead" element={<BannerDisplay platform="mobilead" />} />
//         <Route path="/dashboard/banners/both" element={<BannerDisplay platform="both" />} />
//         <Route path="/dashboard/invoices" element={<InvoicePage />} />
//         <Route path="/dashboard/invoices/:id" element={<InvoiceDetailsPage/>} />
//         <Route path="/dashboard/contacts" element={<ContactList />} />
//     </Routes>
//     );
// }


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
import InvoicePage from './invoice/InvoicePage';
import InvoiceDetailsPage from './invoice/InvoiceDetailsPage';
import ContactList from './Contacts/ContactList';
import PrivateRoute from './PrivateRoute'; // Import the PrivateRoute component

export const DashboardRoutes = () => {
    return (
     
            <Routes>
                <Route path="/dashboard/register" element={<Register />} />
                <Route path="/dashboard/login" element={<Login />} />
                <Route path="/dashboard/user" element={<UserInfo />} />
                <Route path="/dashboard/forgot-password" element={<ForgotPassword />} />
                <Route path="/dashboard/reset-password/:token" element={<ResetPassword />} />

                {/* Admin Routes */}
                <Route path="/dashboard" element={<PrivateRoute element={AdminDashboard} />} />
                <Route path="/dashboard/users/:id" element={<PrivateRoute element={UserEdit} />} />
                <Route path="/dashboard/rewards" element={<PrivateRoute element={RewardsList} />} />
                <Route path="/dashboard/rewards/create" element={<PrivateRoute element={RewardCreate} />} />
                <Route path="/dashboard/rewards/:id/edit" element={<PrivateRoute element={RewardEdit} />} />
                <Route path="/dashboard/products" element={<PrivateRoute element={ProductsList} />} />
                <Route path="/dashboard/products/create" element={<PrivateRoute element={NewProduct} />} />
                <Route path="/dashboard/products/:id/edit" element={<PrivateRoute element={EditProduct} />} />

                <Route path="/dashboard/questions" element={<PrivateRoute element={QuestionList} />} />
                <Route path="/dashboard/questions/add" element={<PrivateRoute element={AddQuestion} />} />
                <Route path="/dashboard/questions/:id/answer" element={<PrivateRoute element={AnswerQuestion} />} />
                <Route path="/dashboard/questions/:id/edit" element={<PrivateRoute element={EditQuestion} />} />
                <Route path="/dashboard/faqs" element={<PrivateRoute element={FAQList} />} />
                <Route path="/dashboard/faqs/create" element={<PrivateRoute element={CreateFAQ} />} />
                <Route path="/dashboard/faqs/:id/edit" element={<PrivateRoute element={EditFAQ} />} />
                <Route path="/dashboard/about-us" element={<PrivateRoute element={AboutUsList} />} />
                <Route path="/dashboard/about-us/create" element={<PrivateRoute element={CreateAboutUs} />} />
                <Route path="/dashboard/about-us/:id/edit" element={<PrivateRoute element={EditAboutUs} />} />
                <Route path="/dashboard/blogs" element={<PrivateRoute element={BlogList} />} />
                <Route path="/dashboard/blogs/add" element={<PrivateRoute element={AddBlog} />} />
                <Route path="/dashboard/blogs/:id/edit" element={<PrivateRoute element={EditBlog} />} />
                <Route path="/dashboard/blogs/:id" element={<PrivateRoute element={ViewBlog} />} />
                <Route path="/dashboard/videos" element={<PrivateRoute element={VideoList} />} />
                <Route path="/dashboard/videos/add" element={<PrivateRoute element={AddVideo} />} />
                <Route path="/dashboard/videos/:id/edit" element={<PrivateRoute element={EditVideo} />} />
                <Route path="/dashboard/videos/:id" element={<PrivateRoute element={ViewVideo} />} />

                {/* Banners Routes */}
                <Route path="/dashboard/banners" element={<PrivateRoute element={BannerList} />} />
                <Route path="/dashboard/banners/add" element={<PrivateRoute element={AddBanner} />} />
                <Route path="/dashboard/banners/:id/edit" element={<PrivateRoute element={EditBanner} />} />
                <Route path="/dashboard/banners/:id" element={<PrivateRoute element={ViewBanner} />} />
                <Route path="/dashboard/banners/desktop" element={<PrivateRoute element={<BannerDisplay platform="desktop" />} />} />
                <Route path="/dashboard/banners/mobile" element={<PrivateRoute element={<BannerDisplay platform="mobile" />} />} />

                <Route path="/dashboard/invoice" element={<PrivateRoute element={InvoicePage} />} />
                <Route path="/dashboard/invoice/:id" element={<PrivateRoute element={InvoiceDetailsPage} />} />
                <Route path="/dashboard/contacts" element={<PrivateRoute element={ContactList} />} />
            </Routes>
     
    );
};
