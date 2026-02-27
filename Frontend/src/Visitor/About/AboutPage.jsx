import React from 'react';
import Navbar from '../navbar';
import Hero from './Hero';
import Story from './Story';
import Team from './Team';
import CTA from './CTA';
import Footer from '../footer';

function AboutPage() {
    return ( 
        <>
            <Navbar/>
            <Hero/>
            <Story/>
            <Team/>
            <CTA/>
            <Footer/>
        </>
     );
}

export default AboutPage;