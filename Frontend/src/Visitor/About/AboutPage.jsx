import React from 'react';
import AboutHero from './AboutHero';
import AboutStory from './AboutStory';
import AboutTeam from './AboutTeam';
import AboutCTA from './AboutCTA';

function AboutPage() {
    return (
        <main>
            <AboutHero />
            <AboutStory />
            <AboutTeam />
            <AboutCTA />
        </main>
    );
}

export default AboutPage;