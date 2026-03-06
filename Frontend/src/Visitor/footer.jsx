import React from 'react';
import './footer.css';

import logoImg from '../assets/Images/Visitor/Navbar/logo.png';
import twitterImg from '../assets/Images/Visitor/Footer/twitter.png';
import facebookImg from '../assets/Images/Visitor/Footer/facebook.png';
import instagramImg from '../assets/Images/Visitor/Footer/instagram.png';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                {/* Column 1 */}
                <div className="footer-col">
                    <div className="footer-logo">
                        <img src={logoImg} alt="Logo" />
                        <h3>The Blog Hub</h3>
                    </div>
                    <p>
                        Discover insightful articles on technology, design,
                        productivity and modern lifestyle.
                    </p>
                </div>

                {/* Column 2 */}
                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <a href="#home">Home</a>
                    <a href="#blogs">Blogs</a>
                    <a href="#about">About Us</a>
                    <a href="#contact">Contact</a>
                </div>

                {/* Column 3 */}
                <div className="footer-col">
                    <h4>Categories</h4>
                    <a href="#technology">Technology</a>
                    <a href="#aiml">AI and ML</a>
                    <a href="#design">Design</a>
                    <a href="#productivity">Productivity</a>
                    <a href="#business">Business</a>
                </div>

                {/* Column 4 - Socials */}
                <div className="socials">
                    <div className="social-box">
                        <img src={twitterImg} alt="Twitter" />
                    </div>
                    <div className="social-box">
                        <img src={facebookImg} alt="Facebook" />
                    </div>
                    <div className="social-box">
                        <img src={instagramImg} alt="Instagram" />
                    </div>
                </div>

            </div>

            <div className="footer-bottom">
                © 2026 BlogVista. All rights reserved.
            </div>
        </footer>
    );
}

export default Footer;