import React from 'react';
import Navbar from '../Navbar';
import Hero from './Hero';
import Contact_Section from './Contact_Section';
import FAQ from './FAQ';
import Footer from '../Footer';


function ContactPage() {
    return ( 
        <>
            <Navbar/>
            <Hero/>
            <Contact_Section/>
            <FAQ/>
            <Footer/>
        </>
     );
}

export default ContactPage;