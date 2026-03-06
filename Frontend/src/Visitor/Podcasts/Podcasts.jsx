import React from 'react';
import './Podcasts.css';

// Importing actual podcasts images from assets directory
import p1 from '../../assets/Images/Visitor/Podcasts/p1.jpg';
import p2 from '../../assets/Images/Visitor/Podcasts/p2.jpg';
import p3 from '../../assets/Images/Visitor/Podcasts/p3.jpg';

function Podcasts() {
    const podcastsData = [
        {
            image: p1,
            duration: "2:30 min",
            title: "AI in Healthcare",
            desc: "Discussing how artificial intelligence is transforming patient care and diagnostics."
        },
        {
            image: p2,
            duration: "6:05 min",
            title: "AI Ethics",
            desc: "Exploring ethical considerations and real-world dilemmas in modern AI systems."
        },
        {
            image: p3,
            duration: "5:31 min",
            title: "Machine Learning Explained",
            desc: "Breaking down complex ML concepts into simple, understandable discussions."
        }
    ];

    return (
        <section className="podcast-section">
            <div className="podcast-grid">
                {podcastsData.map((podcast, index) => (
                    <div className="podcast-card" key={index}>
                        <div className="podcast-image">
                            {/* In the future, updated to standard podcasts images */}
                            <img src={podcast.image} alt={podcast.title} />
                            <div className="play-icon">▶</div>
                            <span className="duration">{podcast.duration}</span>
                        </div>

                        <h3>{podcast.title}</h3>
                        <p>{podcast.desc}</p>

                        <a href="#listen" className="podcast-btn">Listen Podcast →</a>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default Podcasts;