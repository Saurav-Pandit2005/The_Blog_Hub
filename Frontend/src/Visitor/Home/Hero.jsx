import React from 'react';
import './Hero.css';
import heroImg from '../../assets/Images/Visitor/HomePage/hero.jpg';

function Hero() {
    return (
        <section className="hero">
            <div className="hero-left">
                <h1>Unlocking Insights,<br />One Article at a Time</h1>
                <p>
                    Dive deep into the worlds of technology, design,
                    lifestyle, and more with our curated collection
                    of thought-provoking articles and expert analyses.
                </p>
                <button className="primary-btn">Explore Our Latest Posts</button>
            </div>
            <div className="hero-right">
                <img src={heroImg} alt="Hero Image" />
            </div>
        </section>
    );
}

export default Hero;