import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="podcast-hero">
            <div className="podcast-hero-overlay"></div>
            <div className="podcast-hero-content">
                <div className="hero-badge-group">
                    <span className="hero-badge video">📹 Creator Network</span>
                    <span className="hero-badge audio">🎙️ Shared Knowledge</span>
                </div>
                <h1>Empower Your <span className="highlight">Creative Journey</span></h1>
                <p>
                    Connect with fellow authors through immersive discussions. 
                    Explore masterclasses, interviews, and community stories 
                    designed to elevate your craft.
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

export default Hero;