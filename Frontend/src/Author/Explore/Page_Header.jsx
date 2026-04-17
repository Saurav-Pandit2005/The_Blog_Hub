import React from 'react';
import './Page_Header.css';

function Page_Header() {
    return (
        <section className="podcast-hero blogs-hero-custom">
            <div className="podcast-hero-content">
                <h1>Hub of <span className="highlight">Infinite Stories</span></h1>
                <p>
                    Connect with other authors and discover trending articles across the hub. 
                    Be part of a growing ecosystem of knowledge and creativity.
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

export default Page_Header;