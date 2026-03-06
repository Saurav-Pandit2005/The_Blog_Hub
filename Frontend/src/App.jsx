import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Visitor/Home/HomePage';
import BlogPage from './Visitor/Blogs/BlogPage';

import Navbar from './Visitor/navbar';
import Footer from './Visitor/footer';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogPage />} />
      </Routes>
      <Footer />

    </>
  )
}

export default App
