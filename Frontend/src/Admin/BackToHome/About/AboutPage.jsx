import React from 'react';
import AdminHero from './Hero';
import AdminStory from './Story';
import AdminTeam from './Team';
import AdminCTA from './CTA';

function AdminAboutPage() {
    return (
        <>
            <AdminHero />
            <AdminStory />
            <AdminTeam />
            <AdminCTA />
        </>
    );
}

export default AdminAboutPage;
