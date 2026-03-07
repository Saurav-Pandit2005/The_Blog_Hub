import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

function Landing() {
    return (
        <div className="landing-page-root">
            <div className="landing-card">
                <h1>The Blog Hub</h1>
                <Link to="/home" className="landing-enter-btn">Explore Now</Link>
            </div>
        </div>
    );
}

export default Landing;
