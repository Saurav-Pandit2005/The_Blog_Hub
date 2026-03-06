import React from 'react';
import Hero from './Hero';
import ExploreCategories from './ExploreCategories';
import FeaturedArticles from './FeaturedArticles';
import Newsletter from './Newsletter';
import Stats from './Stats';

function HomePage() {
    return (
        <main>
            <Hero />
            <ExploreCategories />
            <FeaturedArticles />
            <Newsletter />
            <Stats />
        </main>
    );
}

export default HomePage;