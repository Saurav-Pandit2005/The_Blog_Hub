import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Visitor/Home/HomePage';
import BlogPage from './Visitor/Blogs/BlogPage';
import PodcastsPage from './Visitor/Podcasts/PodcastsPage';
import ResourcesPage from './Visitor/Resources/ResourcesPage';
import AboutPage from './Visitor/About/AboutPage';
import ContactPage from './Visitor/Contact/ContactPage';

import Navbar from './Visitor/navbar';
import Footer from './Visitor/footer';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/podcasts" element={<PodcastsPage />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
