import React from 'react';
import './AboutStory.css';

function AboutStory() {
    return (
        <section className="about-story">
            <div className="story-wrapper">
                {/* LEFT SIDE CONTENT */}
                <div className="story-content">
                    <h2>Our Story</h2>
                    <p>
                        The Blog Hub began with a simple belief — that quality content
                        should inspire growth, spark curiosity, and create impact.
                    </p>
                    <p>
                        In a world flooded with information, we focus on clarity,
                        depth, and authenticity. Our mission is to build a platform
                        where readers can discover reliable insights across technology,
                        startups, design, and modern lifestyle.
                    </p>
                    <p>
                        We are not just publishing articles — we are building a
                        community driven by learning, creativity, and innovation.
                    </p>
                </div>

                {/* RIGHT SIDE TIMELINE */}
                <div className="story-timeline">
                    <div className="timeline-item">
                        <span className="year">2019</span>
                        <h4>The Blog Hub Founded</h4>
                        <p>Started with a mission to deliver insightful and meaningful digital content.</p>
                    </div>
                    <div className="timeline-item">
                        <span className="year">2021</span>
                        <h4>Growing Community</h4>
                        <p>Expanded into multiple categories and welcomed global contributors.</p>
                    </div>
                    <div className="timeline-item">
                        <span className="year">2023</span>
                        <h4>Platform Expansion</h4>
                        <p>Enhanced user experience and introduced advanced publishing tools.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutStory;
