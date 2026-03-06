import React from 'react';
import './ContactSection.css';

import locationIcon from '../../assets/Images/Visitor/Contact/location.png';
import emailIcon from '../../assets/Images/Visitor/Contact/email.png';
import phoneIcon from '../../assets/Images/Visitor/Contact/phone.png';
import clockIcon from '../../assets/Images/Visitor/Contact/clock.png';
import twitterIcon from '../../assets/Images/Visitor/Contact/twitter.png';
import facebookIcon from '../../assets/Images/Visitor/Contact/facebook.png';
import instagramIcon from '../../assets/Images/Visitor/Contact/instagram.png';

function ContactSection() {
    return (
        <section className="contact-section">
            {/* LEFT INFO */}
            <div className="contact-info">
                <h2>Contact Information</h2>

                <div className="info-item">
                    <img src={locationIcon} alt="Location" />
                    <div>
                        <h4>Address</h4>
                        <p>Rajkot, India</p>
                    </div>
                </div>

                <div className="info-item">
                    <img src={emailIcon} alt="Email" />
                    <div>
                        <h4>Email</h4>
                        <p>support@thebloghub.com</p>
                    </div>
                </div>

                <div className="info-item">
                    <img src={phoneIcon} alt="Phone" />
                    <div>
                        <h4>Phone</h4>
                        <p>+91 98765 43210</p>
                    </div>
                </div>

                <div className="info-item">
                    <img src={clockIcon} alt="Clock" />
                    <div>
                        <h4>Working Hours</h4>
                        <p>Mon - Fri : 9AM - 6PM</p>
                    </div>
                </div>

                {/* SOCIAL MEDIA */}
                <div className="social-links">
                    <a href="#"><img src={twitterIcon} alt="Twitter" /></a>
                    <a href="#"><img src={facebookIcon} alt="Facebook" /></a>
                    <a href="#"><img src={instagramIcon} alt="Instagram" /></a>
                </div>
            </div>

            {/* RIGHT FORM */}
            <div className="contact-form">
                <h2>Send Us a Message</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className="form-group">
                        <input type="text" placeholder="Full Name" />
                    </div>
                    <div className="form-group">
                        <input type="email" placeholder="Email Address" />
                    </div>
                    <div className="form-group">
                        <input type="text" placeholder="Subject" />
                    </div>
                    <div className="form-group">
                        <textarea rows="5" placeholder="Your Message"></textarea>
                    </div>
                    <button type="submit" className="primary-btn">Send Message</button>
                </form>
            </div>
        </section>
    );
}

export default ContactSection;
