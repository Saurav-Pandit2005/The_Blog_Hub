import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Hero.css';
import heroImg from '../../../assets/Images/Author/Home/hero.jpg';

function AdminHero() {
    const navigate = useNavigate();

    return (
        <section className="hero">
            <div className="hero-left">
                <h1>Share Your Content,<br />Inspire the World</h1>
                <p>
                    Manage your stories, engage with your readers, and
                    grow your influence. The Blog Hub provides the tools
                    you need to build your professional brand.
                </p>
                <button 
                    className="primary-btn"
                    onClick={() => navigate('/admin/write-blog')}
                >
                    Start Writing Now
                </button>
            </div>
            <div className="hero-right">
                <img src={heroImg} alt="Author Hero" />
            </div>
        </section>
    );
}

export default AdminHero;
