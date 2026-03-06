import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Visitor/Home/HomePage';

import Navbar from './Visitor/navbar';
import Footer from './Visitor/footer';

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
