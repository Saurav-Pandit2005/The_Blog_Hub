import React from 'react';
import ContactHero from './ContactHero';
import ContactSection from './ContactSection';
import FAQ from './FAQ';

function ContactPage() {
    return (
        <main>
            <ContactHero />
            <ContactSection />
            <FAQ />
        </main>
    );
}

export default ContactPage;