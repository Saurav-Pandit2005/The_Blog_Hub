import React from 'react';
import './Stats.css';

function Stats() {
    return (
        <section className="stats">
            <div className="stat-box">
                <h2>120+</h2>
                <p>Articles Published</p>
            </div>

            <div className="stat-box">
                <h2>25+</h2>
                <p>Categories</p>
            </div>

            <div className="stat-box">
                <h2>10K+</h2>
                <p>Active Readers</p>
            </div>
        </section>
    );
}

export default Stats;