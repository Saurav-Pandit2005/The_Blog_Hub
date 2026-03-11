import React from 'react';
import './Contact_Section.css';

// Using correct Author/Contact images
import locationIcon from '../../assets/Images/Author/Contact/location.png';
import emailIcon from '../../assets/Images/Author/Contact/email.png';
import phoneIcon from '../../assets/Images/Author/Contact/phone.png';
import clockIcon from '../../assets/Images/Author/Contact/clock.png';
import twitterIcon from '../../assets/Images/Author/Contact/twitter.png';
import facebookIcon from '../../assets/Images/Author/Contact/facebook.png';
import instagramIcon from '../../assets/Images/Author/Contact/instagram.png';

function Contact_Section() {
    return (
        <section className="author-contact-wrapper">
            {/* LEFT INFO */}
            <div className="contact-info">
                <h2>Author Support</h2>
                <div className="info-item">
                    <img src={locationIcon} alt="Location" />
                    <div>
                        <h4>Address</h4>
                        <p>Rajkot, India - Global Author Hub</p>
                    </div>
                </div>

                <div className="info-item">
                    <img src={emailIcon} alt="Email" />
                    <div>
                        <h4>Email</h4>
                        <p>authorsupport@thebloghub.com</p>
                    </div>
                </div>

                <div className="info-item">
                    <img src={phoneIcon} alt="Phone" />
                    <div>
                        <h4>Member Hotline</h4>
                        <p>+91 98765 00000</p>
                    </div>
                </div>

                <div className="info-item">
                    <img src={clockIcon} alt="Clock" />
                    <div>
                        <h4>Support Hours</h4>
                        <p>Mon - Fri : 10AM - 5PM</p>
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
                <h2>Message the Editorial Team</h2>
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

export default Contact_Section;