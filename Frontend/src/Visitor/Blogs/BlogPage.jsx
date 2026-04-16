import React, { useState } from 'react';
import PageHeader from './PageHeader';
import Filter from './Filter';
import Blog_Articles from './Blog_Articles';
import Pagination from './Pagination';

function BlogPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState("Latest");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    return (
        <main>
            <PageHeader />
            <Filter 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <Blog_Articles 
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                sortBy={sortBy}
                currentPage={currentPage}
                setTotalPages={setTotalPages}
            />
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
            />
        </main>
    );
}

export default BlogPage;