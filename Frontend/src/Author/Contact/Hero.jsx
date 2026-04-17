import React from 'react';
import './Hero.css';

function Hero() {
    return (
        <section className="podcast-hero blogs-hero-custom">
            <div className="podcast-hero-content">
                <h1>Author <span className="highlight">Support</span> & Dedicated <span className="highlight">Relations</span></h1>
                <p>
                    Have questions about publishing, technical issues, or just want
                    to share your feedback? Our dedicated author relations team
                    is here to help you succeed on The Blog Hub.
                </p>
            </div>
        </section>
    );
}

export default Hero;