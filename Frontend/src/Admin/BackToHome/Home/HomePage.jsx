import React, { useState } from 'react';
import AdminHero from './Hero';
import AdminExploreCategories from './Explore_Categories';
import AdminArticles from './Articles';
import AdminNewsletter from './News_letter';
import AdminStats from './Stats';

function AdminHomePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <>
            <AdminHero />
            <AdminExploreCategories 
                selectedCategory={selectedCategory} 
                setSelectedCategory={setSelectedCategory} 
            />
            <AdminArticles selectedCategory={selectedCategory} />
            <AdminNewsletter />
            <AdminStats />
        </>
    );
}

export default AdminHomePage;
