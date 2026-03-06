import React from 'react';
import { Link } from 'react-router-dom';
import './AboutCTA.css';

function AboutCTA() {
    return (
        <section className="about-cta">
            <h2>Be Part of Our Journey</h2>
            <p>Start exploring insights or contribute your own ideas today.</p>
            <br />
            <br />
            <div className="cta-buttons">
                <Link to="/blogs" className="primary-btn">Explore Articles</Link>
                <Link to="/register" className="primary-outline-btn">Join as Author</Link>
            </div>
        </section>
    );
}

export default AboutCTA;
