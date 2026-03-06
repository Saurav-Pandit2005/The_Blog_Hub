import React from 'react';
import './Newsletter.css';

function Newsletter() {
    return (
        <section className="newsletter">
            <h2>Subscribe to Our Newsletter</h2>
            <p>Get the latest articles and insights delivered straight to your inbox.</p>

            <div className="newsletter-box">
                <input type="email" placeholder="Enter your email" />
                <button className="primary-btn">Subscribe</button>
            </div>
        </section>
    );
}

export default Newsletter;
