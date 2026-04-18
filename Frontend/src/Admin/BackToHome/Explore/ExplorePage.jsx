import React, { useState } from 'react';
import AdminPageHeader from './Page_Header';
import AdminFilter from './Filter';
import AdminExploreArticles from './Explore_Arctiles'; // Using user's filename with typo
import AdminPagination from './Pagination';

function AdminExplorePage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All Categories");
    const [sortBy, setSortBy] = useState("Latest");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 400, behavior: 'smooth' }); // Scroll to content area
    };

    return (
        <main className="admin-explore-view">
            <AdminPageHeader />
            <AdminFilter 
                searchTerm={searchTerm} 
                setSearchTerm={setSearchTerm}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            <AdminExploreArticles 
                searchTerm={searchTerm}
                selectedCategory={selectedCategory}
                sortBy={sortBy}
                currentPage={currentPage}
                setTotalPages={setTotalPages}
            />
            {totalPages > 1 && (
                <AdminPagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </main>
    );
}

export default AdminExplorePage;
