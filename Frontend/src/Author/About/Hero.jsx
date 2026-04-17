import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="podcast-hero blogs-hero-custom">
            <div className="podcast-hero-content">
                <h1><span className="highlight">Empowering</span> Authors to Share Their <span className="highlight">Authentic</span> Voice</h1>
                <p>
                    The Blog Hub is a dedicated space for creators. We provide the platform,
                    you provide the inspiration. Together, we build a global community that values
                    depth, clarity, and meaningful storytelling.
                </p>
            </div>
        </section>
    );
}

export default Hero;