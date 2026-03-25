import React from 'react';
import { Link } from 'react-router-dom';
import {
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Github,
    Mail,
    MapPin,
    Send
} from 'lucide-react';
import './Footer.css';

import logoImg from '../../assets/Images/Visitor/Navbar/logo.png';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-container">
                    {/* Brand Section */}
                    <div className="footer-col brand-col">
                        <div className="footer-logo">
                            <img src={logoImg} alt="The Blog Hub Logo" />
                            <h3>The Blog Hub</h3>
                        </div>
                        <p className="brand-desc">
                            Empowering authors to share their unique stories with the world. 
                            Join our community of creative minds and professional writers.
                        </p>
                        <div className="footer-socials">
                            <a href="https://twitter.com" className="social-link"><Twitter size={18} /></a>
                            <a href="https://facebook.com" className="social-link"><Facebook size={18} /></a>
                            <a href="https://instagram.com" className="social-link"><Instagram size={18} /></a>
                            <a href="https://linkedin.com" className="social-link"><Linkedin size={18} /></a>
                            <a href="https://github.com" className="social-link"><Github size={18} /></a>
                        </div>
                    </div>

                    {/* Author Links Section */}
                    <div className="footer-col">
                        <h4>Author Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/author/home">Dashboard</Link></li>
                            <li><Link to="/author/write-post">Write Post</Link></li>
                            <li><Link to="/author/explore">Explore Community</Link></li>
                            <li><Link to="/author/profile">My Profile</Link></li>
                            <li><Link to="/author/about">About The Hub</Link></li>
                        </ul>
                    </div>

                    {/* Resources Section */}
                    <div className="footer-col">
                        <h4>Writer Resources</h4>
                        <ul className="footer-links">
                            <li><Link to="/author/guides">Writing Guides</Link></li>
                            <li><Link to="/author/podcasts">Writer Podcasts</Link></li>
                            <li><Link to="/author/support">Author Support</Link></li>
                            <li><Link to="/author/terms">Terms of Service</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-col newsletter-col">
                        <h4>Contact Us</h4>
                        <p>Need help with your account or publishing? Reach out to our team.</p>
                        
                        <div className="footer-contact">
                            <div className="contact-item">
                                <Mail size={16} />
                                <span>support@bloghub.com</span>
                            </div>
                            <div className="contact-item">
                                <MapPin size={16} />
                                <span>Rajkot, Gujarat, India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="footer-bottom-content">
                    <p>© {currentYear} The Blog Hub. Built with ❤️ for the creator community.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
