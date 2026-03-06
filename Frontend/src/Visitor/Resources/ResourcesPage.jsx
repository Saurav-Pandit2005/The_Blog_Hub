import React from 'react';
import ResourcesHero from './ResourcesHero';
import FeaturedResource from './FeaturedResource';
import ResourcesGrid from './ResourcesGrid';

function ResourcesPage() {
    return (
        <main>
            <ResourcesHero />
            <FeaturedResource />
            <ResourcesGrid />
        </main>
    );
}

export default ResourcesPage;