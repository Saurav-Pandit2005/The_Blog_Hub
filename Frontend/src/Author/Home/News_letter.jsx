import React from 'react';
import './News_letter.css';

function News_letter() {
    return (
        <section className="newsletter">
            <h2>Grow Your Mailing List</h2>
            <p>Engage with your readers directly by sending updates about your latest stories and newsletters.</p>

            <div className="newsletter-box">
                <input type="email" placeholder="Your reader's email..." />
                <button className="primary-btn">Invite Reader</button>
            </div>
        </section>
    );
}

export default News_letter;