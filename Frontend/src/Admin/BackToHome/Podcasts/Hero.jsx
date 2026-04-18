import React from 'react';
import './Hero.css';

function AdminHero() {
    return (
        <section className="podcast-hero">
            <div className="podcast-hero-overlay"></div>
            <div className="podcast-hero-content">
                <div className="hero-badge-group">
                    <span className="hero-badge video">📹 Creator Network</span>
                    <span className="hero-badge audio">🎙️ Shared Knowledge</span>
                </div>
                <h1>Central <span className="highlight">Multimedia Hub</span></h1>
                <p>
                    Monitor the pulse of our creator network. Audit immersive discussions, 
                    track listener engagement, and curate the standard of masterclasses and interviews.
                </p>
                <div className="hero-stats-mini">
                    <div className="mini-stat"><b>50+</b> Podcasts</div>
                    <div className="stat-separator"></div>
                    <div className="mini-stat"><b>12k+</b> Listeners</div>
                </div>
            </div>
        </section>
    );
}

export default AdminHero;
