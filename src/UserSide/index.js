import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/HomeScreen/index';
import Prizes from './pages/PrizesScreen';
import Winners from './pages/WinnersPage';
import AboutUs from './pages/AboutUsScreen';
import RecenetLuckyDraws from './pages/RecentLuckyDrawsScreen';
import Blogs from './pages/BlogsScreen';
import ContactUs from './pages/ContactsUsScreen';
import TermsConditions from './pages/Terms&ConditionsScreen';
import FAQs from './pages/FAQsScreen';

const UserSide = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/prizes" element={<Prizes/>} />
      <Route path="/winners" element={<Winners/>} />
      <Route path="/aboutUs" element={<AboutUs/>} />
      <Route path="/recentLuckyDraws" element={<RecenetLuckyDraws/>} />
      <Route path="/blogs" element={<Blogs/>} />
      <Route path="/contactUs" element={<ContactUs/>} />
      <Route path="/terms&Conditions" element={<TermsConditions/>} />
      <Route path="/faqs" element={<FAQs/>} />
    </Routes>
  );
};

export default UserSide;
 