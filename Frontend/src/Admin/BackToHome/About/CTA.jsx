import React from 'react';
import { Link } from 'react-router-dom';
import './CTA.css';

function AdminCTA() {
    return (
        <section className="about-cta">
            <h2>Start Your Creative Journey Today</h2>
            <p>
                Join thousands of authors who choose The Blog Hub
                to reach their audience and build their influence.
            </p>
            <div className="cta-buttons">
                <Link to="/admin/dashboard" className="primary-btn">View My Dashboard</Link>
                <Link to="/admin/explore" className="primary-outline-btn">Explore Community</Link>
            </div>
        </section>
    );
}

export default AdminCTA;
