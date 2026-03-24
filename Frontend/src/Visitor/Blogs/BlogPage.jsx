import React, { useState } from 'react';
import PageHeader from './PageHeader';
import Filter from './Filter';
import Blog_Articles from './Blog_Articles';
import Pagination from './Pagination';

function BlogPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState("Latest");

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
            />
            <Pagination />
        </main>
    );
}

export default BlogPage;