import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="podcast-hero">
            <div className="podcast-hero-content">
                <span className="hero-badge">Author Stories</span>
                <h1>Voices of Our Author Community</h1>
                <p>
                    Listen to discussions, interviews, and deep dives by
                    fellow creators. Gain inspiration and master your craft
                    through audio experiences.
                </p>
            </div>
        </section>
    );
}

export default Hero;