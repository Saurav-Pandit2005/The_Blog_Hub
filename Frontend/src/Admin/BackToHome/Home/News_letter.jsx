import React from 'react';
import './News_letter.css';

function AdminNewsletter() {
    return (
        <section className="newsletter">
            <h2>Support the Community Hub</h2>
            <p>Maintain direct engagement with your platform readers by sharing updates about the latest stories and site stewardship news.</p>

            <div className="newsletter-box">
                <input type="email" placeholder="Reader's subscription email..." />
                <button className="primary-btn">Invite Reader</button>
            </div>
        </section>
    );
}

export default AdminNewsletter;
