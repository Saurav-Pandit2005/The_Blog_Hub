import React from 'react';
import './PageHeader.css';

function PageHeader() {
    return (
        <section className="podcast-hero blogs-hero-custom">
            <div className="podcast-hero-content">
                <h1>Explore the <span className="highlight">World of Ideas</span></h1>
                <p>
                    Dive into a curated collection of articles, stories, and technical 
                    deep-dives from the creative minds at The Blog Hub.
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

export default PageHeader;
