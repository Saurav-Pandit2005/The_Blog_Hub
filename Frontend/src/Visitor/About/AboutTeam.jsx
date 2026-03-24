import React from 'react';
import { Github, Linkedin, Twitter } from 'lucide-react';
import './AboutTeam.css';

import srv from '../../assets/Images/Visitor/About/srv.jpg';
import surja from '../../assets/Images/Visitor/About/surja.jpeg';
import team3 from '../../assets/Images/Visitor/About/team3.jpg';

function AboutTeam() {
    const team = [
        {
            name: "Saurav Pandit",
            role: "Founder & Lead Developer",
            image: srv,
            description: "A visionary developer who built The Blog Hub from the ground up, focusing on creating a seamless space for creators and readers.",
            social: {
                github: "https://github.com",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
            }
        },
        {
            name: "Surja Bist",
            role: "Content & Strategy Lead",
            image: surja,
            description: "Surja ensures that the quality of content on our platform remains top-notch, guiding the editorial direction and community outreach.",
            social: {
                github: "https://github.com",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
            }
        },
        {
            name: "Rima Sah",
            role: "Product Design & Architecture",
            image: team3,
            description: "Rima handles the platform's architectural integrity and user experience, making sure every feature is as intuitive as it is powerful.",
            social: {
                github: "https://github.com",
                linkedin: "https://linkedin.com",
                twitter: "https://twitter.com"
            }
        }
    ];

    return (
        <section className="about-team">
            <div className="team-header">
                <h2>The Minds Behind The Hub</h2>
                <p>
                    We’re a small team with a big vision: to democratize knowledge sharing 
                    and build the world's most creator-friendly blog platform.
                </p>
            </div>

            <div className="team-grid">
                {team.map((member, index) => (
                    <div className="team-card" key={index}>
                        <div className="team-image-wrapper">
                            <img 
                                src={member.image} 
                                alt={member.name} 
                                className={member.name === "Saurav Pandit" ? "srv-img" : ""}
                            />
                        </div>
                        <h3>{member.name}</h3>
                        <span className="member-role">{member.role}</span>
                        <p>{member.description}</p>
                        
                        <div className="team-social">
                            <a href={member.social.github} target="_blank" rel="noopener noreferrer"><Github size={18} /></a>
                            <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
                            <a href={member.social.twitter} target="_blank" rel="noopener noreferrer"><Twitter size={18} /></a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default AboutTeam;
