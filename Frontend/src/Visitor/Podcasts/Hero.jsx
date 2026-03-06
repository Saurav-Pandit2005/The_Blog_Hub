import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="podcast-hero">
            <div className="podcast-hero-content">
                <span className="hero-badge">Audio Insights</span>
                <h1>Conversations That Shape the Future</h1>
                <p>
                    Explore expert discussions on AI, startups, technology,
                    and innovation through our curated podcast episodes.
                </p>
            </div>
        </section>
    );
}

export default Hero;