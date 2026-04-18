import React from 'react';
import './Hero.css';

function AdminHero() {
    return (
        <section className="podcast-hero resources-hero-custom">
            <div className="podcast-hero-content">
                <div className="hero-badge-group">
                    <span className="hero-badge video">📚 PDF Guides</span>
                    <span className="hero-badge audio">📄 Technical Papers</span>
                </div>
                <h1>Asset <span className="highlight">Management Core</span></h1>
                <p>
                    Audit our growing collection of technical guides and research. 
                    Monitor download analytics, verify document integrity, and 
                    maintain the platform's repository of expertise.
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

export default AdminHero;
