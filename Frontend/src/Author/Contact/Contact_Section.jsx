import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
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
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const { name, email, subject, message } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const token = localStorage.getItem('token');
        const user = JSON.parse(localStorage.getItem('user') || 'null');

        if (!token || user?.role?.toLowerCase() !== 'author') {
            alert('Please login as an Author to send messages.');
            navigate('/register');
            return;
        }

        setLoading(true);
        try {
            const res = await api.post('/inquiries', formData);
            if (res.data.success) {
                alert('Success! Your message has been sent to the Editorial Team.');
                setFormData({
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                });
            }
        } catch (err) {
            alert(err.response?.data?.error || 'Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="name"
                            placeholder="Full Name" 
                            value={name}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Email Address" 
                            value={email}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="subject"
                            placeholder="Subject" 
                            value={subject}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea 
                            name="message"
                            rows="5" 
                            placeholder="Your Message"
                            value={message}
                            onChange={onChange}
                            required
                        ></textarea>
                    </div>
                    <button type="submit" className="primary-btn" disabled={loading}>
                        {loading ? 'Sending...' : 'Send Message'}
                    </button>
                </form>
            </div>
        </section>
    );
}

export default Contact_Section;