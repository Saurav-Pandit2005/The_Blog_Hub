import React from 'react';
import Navbar from '../navbar';
import Hero from './Hero';
import Podcasts from './Podcasts';
import Footer from '../footer';

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