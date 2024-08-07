
 
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomeScreen/index';
import Prizes from './pages/PrizesScreen';
import Winners from './pages/WinnersPage';
import AboutUs from './pages/AboutUsScreen';
import RecenetLuckyDraws from './pages/RecentLuckyDrawsScreen';
import Blogs from './pages/BlogsScreen';

import TermsConditions from './pages/Terms&ConditionsScreen';
import FAQs from './pages/FAQsScreen';

import Cart from './pages/HomeScreen/Components/Cart';
import ProductDetail from './pages/HomeScreen/Components/ProductDetail';
import BlogDetails from './pages/BlogsScreen/BlogDetails';
import Contact from './pages/ContactsUsScreen/Components/Contact';
import CheckoutPage from './pages/HomeScreen/Components/CheckoutPage';
import Game from './pages/HomeScreen/Components/Game';

const UserSide = () => {
  return (
 
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/prizes" element={<Prizes />} />
        <Route path="/winners" element={<Winners />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/recentLuckyDraws" element={<RecenetLuckyDraws />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/contactUs" element={<Contact />} />
        
        <Route path="/terms&Conditions" element={<TermsConditions />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />


        <Route path="/game" element={<Game />} />
      </Routes>
 
  );
};

export default UserSide;
