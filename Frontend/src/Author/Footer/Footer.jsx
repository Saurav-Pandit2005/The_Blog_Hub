import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

// Assets
import logoImg from '../../assets/Images/Visitor/Navbar/logo.png';
import facebookImg from '../../assets/Images/Author/Footer/facebook.png';
import twitterImg from '../../assets/Images/Author/Footer/twitter.png';
import instagramImg from '../../assets/Images/Author/Footer/instagram.png';

function Footer() {
    return (
        <footer className="author-footer">
            <div className="footer-container">

                {/* Column 1: Info */}
                <div className="footer-col">
                    <div className="footer-logo">
                        <img src={logoImg} alt="Logo" />
                        <h3>The Blog Hub</h3>
                    </div>
                    <p>
                        Empowering authors to share their stories with the world.
                        Join our community of creative minds and professional writers.
                    </p>
                </div>

                {/* Column 2: Author Links */}
                <div className="footer-col">
                    <h4>Author Links</h4>
                    <Link to="/author/home">Home</Link>
                    <Link to="/author/explore">Explore</Link>
                    <Link to="/author/dashboard">Dashboard</Link>
                    <Link to="/author/profile">My Profile</Link>
                </div>

                {/* Column 3: Resources */}
                <div className="footer-col">
                    <h4>Resources</h4>
                    <Link to="/author/resources">Author Guides</Link>
                    <Link to="/author/podcasts">Podcasts</Link>
                    <Link to="/author/about">About Us</Link>
                    <Link to="/author/contact">Support</Link>
                </div>

                {/* Column 4: Socials */}
                <div className="footer-col">
                    <h4>Connect</h4>
                    <div className="socials">
                        <div className="social-box">
                            <img src={facebookImg} alt="Facebook" />
                        </div>
                        <div className="social-box">
                            <img src={twitterImg} alt="Twitter" />
                        </div>
                        <div className="social-box">
                            <img src={instagramImg} alt="Instagram" />
                        </div>
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                &copy; 2026 The Blog Hub. All rights reserved. | Designed for Authors
            </div>
        </footer>
    );
}

export default Footer;
