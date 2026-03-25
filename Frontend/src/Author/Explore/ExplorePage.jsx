import React, { useState } from 'react';
import Navbar from '../Navbar/Navbar';
import Page_Header from './Page_Header';
import Filter from './Filter';
import Explore_Articles from './Explore_Articles';
import Pagination from './Pagination';
import Footer from '../Footer/Footer';

function ExplorePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState("Latest");

    return (
        <>
            <Navbar />
            <Page_Header />
            <Filter 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <Explore_Articles 
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                sortBy={sortBy}
            />
            <Pagination />
            <Footer />
        </>
    );
}

export default ExplorePage;