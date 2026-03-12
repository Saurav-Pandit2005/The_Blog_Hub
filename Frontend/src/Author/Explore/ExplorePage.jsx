import React from 'react';
import Navbar from '../Navbar/Navbar';
import Page_Header from './Page_Header';
import Filter from './Filter';
import Explore_Articles from './Explore_Articles';
import Pagination from './Pagination';
import Footer from '../Footer/Footer';

function ExplorePage() {
    return (
        <>
            <Navbar />
            <Page_Header />
            <Filter />
            <Explore_Articles />
            <Pagination />
            <Footer />
        </>
    );
}

export default ExplorePage;