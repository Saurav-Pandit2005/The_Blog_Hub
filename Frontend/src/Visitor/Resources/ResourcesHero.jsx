import React from 'react';
import './ResourcesHero.css';

function ResourcesHero() {
    return (
        <section className="podcast-hero resources-hero-custom">
            <div className="podcast-hero-content">
                <div className="hero-badge-group">
                    <span className="hero-badge video">📚 PDF Guides</span>
                    <span className="hero-badge audio">📄 Technical Papers</span>
                </div>
                <h1>Library of <span className="highlight">Digital Excellence</span></h1>
                <p>
                    Access whitepapers, e-books, and technical research 
                    to deepen your expertise and fuel your next big project. 
                    Your gate to curated knowledge starts here.
                </p>
                <div className="hero-stats-mini">
                    <div className="mini-stat"><b>100+</b> Resources</div>
                    <div className="stat-separator"></div>
                    <div className="mini-stat"><b>8k+</b> Downloads</div>
                </div>
            </div>
        </section>
    );
}

export default ResourcesHero;
