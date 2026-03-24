import React, { useState } from 'react';
import Hero from './Hero';
import ExploreCategories from './ExploreCategories';
import FeaturedArticles from './FeaturedArticles';
import Newsletter from './Newsletter';
import Stats from './Stats';

function HomePage() {
    const [selectedCategory, setSelectedCategory] = useState("All");

    return (
        <main>
            <Hero />
            <ExploreCategories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
            />
            <FeaturedArticles
                selectedCategory={selectedCategory}
            />
            <Newsletter />
            <Stats />
        </main>
    );
}

export default HomePage;