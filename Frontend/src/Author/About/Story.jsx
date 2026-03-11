import React from 'react';
import './Story.css';

function Story() {
    return (
        <section className="about-story">
            <div className="story-wrapper">
                {/* LEFT SIDE CONTENT */}
                <div className="story-content">
                    <h2>Our Author Community</h2>
                    <p>
                        We built The Blog Hub specifically for writers like you. We understand
                        that every story needs a home where it can be appreciated and shared
                        with the right audience.
                    </p>
                    <p>
                        Our platform is designed to take the technical burden off your
                        shoulders. Whether you are a professional journalist or a hobbyist
                        blogger, we provide the tools to publish beautiful, responsive,
                        and high-engagement articles.
                    </p>
                    <p>
                        Since our inception, our focus has been on author success. We believe
                        that when authors thrive, the entire community benefits from the
                        richness of diverse perspectives.
                    </p>
                </div>

                {/* RIGHT SIDE TIMELINE */}
                <div className="story-timeline">
                    <div className="timeline-item">
                        <span className="year">2019</span>
                        <h4>The Seed is Planted</h4>
                        <p>Conceptualized a writer-first platform where content quality reigns supreme.</p>
                    </div>
                    <div className="timeline-item">
                        <span className="year">2021</span>
                        <h4>Author Tools 1.0</h4>
                        <p>Launched our first suite of editor tools designed for seamless publishing.</p>
                    </div>
                    <div className="timeline-item">
                        <span className="year">2023</span>
                        <h4>Global Reach</h4>
                        <p>Reached a milestone of 10,000+ active authors contributing across 50 categories.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Story;