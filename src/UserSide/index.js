
 
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

import ProductDetail from './pages/HomeScreen/Components/ProductDetail';
import BlogDetails from './pages/BlogsScreen/BlogDetails';
import Contact from './pages/ContactsUsScreen/Components/Contact';
import CartScreen from './pages/CartScreen';
import InititalGameScreen from './pages/GameScreen';
import GameScreen from './pages/GameScreen/GameScreen';

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
        <Route path="/cart" element={<CartScreen />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/initialGameScreen" element={<InititalGameScreen />} />


        <Route path="/GameScreen" element={<GameScreen />} />
      </Routes>
 
  );
};

export default UserSide;
