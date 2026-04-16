import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import './Hero.css';
import heroImg from '../../assets/Images/Visitor/HomePage/hero.jpg';

function Hero() {
    const navigate = useNavigate();
    const [latestSlug, setLatestSlug] = useState('');

    useEffect(() => {
        const fetchLatestBlog = async () => {
            try {
                // Get the most recent blog using sorting and limiting
                const res = await api.get('/blogs?sort=-createdAt&limit=1');
                if (res.data.success && res.data.data.length > 0) {
                    setLatestSlug(res.data.data[0].slug);
                }
            } catch (err) {
                console.error("Error finding latest post:", err);
            }
        };
        fetchLatestBlog();
    }, []);

    const handleExplore = () => {
        if (latestSlug) {
            navigate(`/blog-detail/${latestSlug}`);
        } else {
            // Fallback to blogs list if no latest post found
            navigate('/blogs');
        }
    };

    return (
        <section className="hero">
            <div className="hero-left">
                <h1>Unlocking Insights,<br />One Article at a Time</h1>
                <p>
                    Dive deep into the worlds of technology, design,
                    lifestyle, and more with our curated collection
                    of thought-provoking articles and expert analyses.
                </p>
                <button className="primary-btn" onClick={handleExplore}>
                    Explore Our Latest Post
                </button>
            </div>
            <div className="hero-right">
                <img src={heroImg} alt="Hero Image" />
            </div>
        </section>
    );
}

export default Hero;