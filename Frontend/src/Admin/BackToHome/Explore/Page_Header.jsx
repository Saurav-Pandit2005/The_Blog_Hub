import React from 'react';
import './Page_Header.css';

function AdminPageHeader() {
    return (
        <section className="podcast-hero blogs-hero-custom">
            <div className="podcast-hero-content">
                <h1>Administrative <span className="highlight">Content Core</span></h1>
                <p>
                    Audit trending narratives, evaluate category performance, and 
                    oversee the standard of excellence across the entire ecosystem.
                </p>
                <div className="hero-stats-mini">
                    <div className="mini-stat"><b>1k+</b> Articles</div>
                    <div className="stat-separator"></div>
                    <div className="mini-stat"><b>50k+</b> Readers</div>
                </div>
            </div>
        </section>
    );
}

export default AdminPageHeader;
