import React from 'react';
import Navbar from '../Navbar'
import Hero from './Hero';
import Story from './Story';
import Team from './Team';
import CTA from './CTA';
import Footer from '../Footer'

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