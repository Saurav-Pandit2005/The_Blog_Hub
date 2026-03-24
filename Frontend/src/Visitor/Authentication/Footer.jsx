import React from 'react';
import { Link } from 'react-router-dom';
import {
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Github,
    Mail,
    Send,
    MapPin,
    Phone
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
                            Empowering creators and readers through insightful stories,
                            expert perspectives, and a community-driven blogging experience.
                        </p>
                        <div className="footer-socials">
                            <a href="https://twitter.com" className="social-link"><Twitter size={18} /></a>
                            <a href="https://facebook.com" className="social-link"><Facebook size={18} /></a>
                            <a href="https://instagram.com" className="social-link"><Instagram size={18} /></a>
                            <a href="https://linkedin.com" className="social-link"><Linkedin size={18} /></a>
                            <a href="https://github.com" className="social-link"><Github size={18} /></a>
                        </div>
                    </div>

                    {/* Links Section */}
                    <div className="footer-col">
                        <h4>Explore</h4>
                        <ul className="footer-links">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/blogs">All Blogs</Link></li>
                            <li><Link to="/podcasts">Podcasts</Link></li>
                            <li><Link to="/resources">Resources</Link></li>
                            <li><Link to="/about">About Our Mission</Link></li>
                        </ul>
                    </div>

                    {/* Categories Section */}
                    <div className="footer-col">
                        <h4>Popular Categories</h4>
                        <ul className="footer-links">
                            <li><Link to="/blogs?category=Technology">Technology</Link></li>
                            <li><Link to="/blogs?category=AI">AI & Machine Learning</Link></li>
                            <li><Link to="/blogs?category=Design">Creative Design</Link></li>
                            <li><Link to="/blogs?category=Productivity">Productivity</Link></li>
                            <li><Link to="/blogs?category=Business">Business Growth</Link></li>
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="footer-col newsletter-col">
                        <h4>Stay Updated</h4>
                        <p>Subscribe to our newsletter for the latest articles and updates.</p>
                        {/* <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
                            <input type="email" placeholder="Email Address" required />
                            <button type="submit">
                                <Send size={16} />
                            </button>
                        </form> */}
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