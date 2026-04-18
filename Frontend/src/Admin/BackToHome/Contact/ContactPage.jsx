import React from 'react';
import AdminHero from './Hero';
import AdminContactSection from './Contact_Section';
import AdminFAQ from './FAQ';

function AdminContactPage() {
    return (
        <>
            <AdminHero />
            <AdminContactSection />
            <AdminFAQ />
        </>
    );
}

export default AdminContactPage;
