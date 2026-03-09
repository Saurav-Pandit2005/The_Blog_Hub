import React from 'react';
import './Stats.css';

function Stats() {
    return (
        <section className="stats">
            <div className="stat-box">
                <h2>1.2K</h2>
                <p>Total Reads</p>
            </div>

            <div className="stat-box">
                <h2>45</h2>
                <p>Articles Published</p>
            </div>

            <div className="stat-box">
                <h2>850</h2>
                <p>Followers</p>
            </div>

            <div className="stat-box">
                <h2>4.8</h2>
                <p>Avg Rating</p>
            </div>
        </section>
    );
}

export default Stats;