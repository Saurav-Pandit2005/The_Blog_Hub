import React from 'react';
import { Link } from 'react-router-dom';
import {
    Twitter,
    Facebook,
    Instagram,
    Linkedin,
    Github,
    Mail,
    MapPin
} from 'lucide-react';
import './Footer.css';

import logoImg from '../../../assets/Images/Visitor/Navbar/logo.png';
import adminProfileImg from '../../../assets/Images/Admin/Profile/admin.jpg';
import { UserContext } from '../../../context/UserContext';

function AdminFooter() {
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
                            Stewarding the future of digital content. 
                            Managing a community of creative minds and professional writers.
                        </p>
                        <div className="footer-socials">
                            <a href="https://twitter.com" className="social-link"><Twitter size={18} /></a>
                            <a href="https://facebook.com" className="social-link"><Facebook size={18} /></a>
                            <a href="https://instagram.com" className="social-link"><Instagram size={18} /></a>
                            <a href="https://linkedin.com" className="social-link"><Linkedin size={18} /></a>
                            <a href="https://github.com" className="social-link"><Github size={18} /></a>
                        </div>
                    </div>

                    {/* Admin Links Section */}
                    <div className="footer-col">
                        <h4>Admin Links</h4>
                        <ul className="footer-links">
                            <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>
                            <li><Link to="/admin/write-blog">Write Blog</Link></li>
                            <li><Link to="/blogs">Platform Content</Link></li>
                            <li><Link to="/admin/profile">Admin Profile</Link></li>
                            <li><Link to="/about">About The Hub</Link></li>
                        </ul>
                    </div>

                    {/* Management Section */}
                    <div className="footer-col">
                        <h4>Management</h4>
                        <ul className="footer-links">
                            <li><Link to="/admin/manage-users">User Control</Link></li>
                            <li><Link to="/podcasts">Podcasts</Link></li>
                            <li><Link to="/admin/inquiries">Inquiries</Link></li>
                            <li><Link to="/contact">Support</Link></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="footer-col newsletter-col">
                        <h4>Official Contact</h4>
                        <p>Managing account issues or site integrity? Reach out to the support team.</p>
                        
                        <div className="footer-contact">
                            <div className="contact-item">
                                <Mail size={16} />
                                <span>admin-support@bloghub.com</span>
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
                    <p>© {currentYear} The Blog Hub. Secure Administrative Environment.</p>
                </div>
            </div>
        </footer>
    );
}

export default AdminFooter;
