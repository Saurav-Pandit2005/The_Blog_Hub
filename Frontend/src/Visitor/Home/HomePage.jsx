import React from 'react';
import Navbar from '../navbar';
import Hero from './Hero';
import Explore_Categories from './Explore_Categories';
import Articles from './Articles';
import News_letter from './News_letter';
import Stats from './Stats';
import Footer from '../footer';


function HomePage() {
    return (  
        <>
            <Navbar/>
            <Hero/>
            <Explore_Categories/>
            <Articles/>
            <News_letter/>
            <Stats/>
            <Footer/>
        </>
    );
}

export default HomePage;