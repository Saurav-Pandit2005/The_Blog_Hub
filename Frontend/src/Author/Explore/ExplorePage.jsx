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
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 400); // Scroll to content area
    };

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
                currentPage={currentPage}
                setTotalPages={setTotalPages}
            />
            {totalPages > 1 && (
                <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
            <Footer />
        </>
    );
}

export default ExplorePage;