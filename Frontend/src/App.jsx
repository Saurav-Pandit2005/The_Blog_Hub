import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './Visitor/Home/HomePage';
import BlogPage from './Visitor/Blogs/BlogPage';
import PodcastsPage from './Visitor/Podcasts/PodcastsPage';
import ResourcesPage from './Visitor/Resources/ResourcesPage';
import AboutPage from './Visitor/About/AboutPage';
import ContactPage from './Visitor/Contact/ContactPage';
import Login from './Visitor/Authentication/Login';
import Register from './Visitor/Authentication/Register';
import Landing from './Visitor/Landing/Landing';
import BlogDetailPage from './Visitor/Blogs/BlogDetail/BlogDetailPage';
import ForgotPassword from './Visitor/Authentication/ForgotPassword';

import Navbar from './Visitor/Authentication/navbar.jsx';
import Footer from './Visitor/Authentication/footer.jsx';

function App() {
  const location = useLocation();

  // Paths where we don't want Navbar and Footer
  const hideNavFooter = ['/', '/login', '/register', '/forgot-password'].includes(location.pathname);

  return (
    <>
      {!hideNavFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/podcasts" element={<PodcastsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/blog-detail" element={<BlogDetailPage />} />
      </Routes>
      {!hideNavFooter && <Footer />}

    </>
  )
}

export default App
