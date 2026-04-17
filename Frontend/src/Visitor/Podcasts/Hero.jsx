import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="podcast-hero">
            <div className="podcast-hero-overlay"></div>
            <div className="podcast-hero-content">
                <div className="hero-badge-group">
                    <span className="hero-badge video">📹 Video Insights</span>
                    <span className="hero-badge audio">🎙️ Audio Stories</span>
                </div>
                <h1>Conversations That <span className="highlight">Shape the Future</span></h1>
                <p>
                    Immerse yourself in high-definition dialogues and storytelling. 
                    Explore expert perspectives on AI, Innovation, and Technology through our 
                    curated multimedia library.
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