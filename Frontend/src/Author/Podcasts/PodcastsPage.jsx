import React from 'react';
import Navbar from '../Navbar/Navbar';
import Hero from './Hero';
import Podcasts from './Podcasts';
import Footer from '../Footer/Footer';

function PodcastsPage() {
    return (
        <>
            <Navbar />
            <Hero />
            <Podcasts />
            <Footer />
        </>
    );
}

export default PodcastsPage;