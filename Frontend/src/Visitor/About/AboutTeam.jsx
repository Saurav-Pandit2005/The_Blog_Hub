import React from 'react';
import './AboutTeam.css';
import team1 from '../../assets/Images/Visitor/About/team1.jpg';
import team2 from '../../assets/Images/Visitor/About/team2.jpg';
import team3 from '../../assets/Images/Visitor/About/team3.jpg';

function AboutTeam() {
    return (
        <section className="about-team">
            <div className="team-header">
                <h2>Meet The Team</h2>
                <p>
                    The passionate minds behind The Blog Hub, working together
                    to deliver meaningful digital experiences.
                </p>
            </div>

            <div className="team-grid">
                <div className="team-card">
                    <img src={team1} alt="Razz Patel" />
                    <h3>Razz Patel</h3>
                    <span>Founder and Full Stack Developer</span>
                    <p>
                        Leads the technical vision and ensures the platform
                        remains scalable, modern, and user-focused.
                    </p>
                </div>

                <div className="team-card">
                    <img src={team2} alt="Surbhi Khyati" />
                    <h3>Surbhi Khyati</h3>
                    <span>Editorial and Strategy Head</span>
                    <p>
                        Oversees content quality, research direction,
                        and ensures every article delivers real value.
                    </p>
                </div>

                <div className="team-card">
                    <img src={team3} alt="Kriti Goyal" />
                    <h3>Kriti Goyal</h3>
                    <span>Platform Architecture</span>
                    <p>
                        Responsible for system design, performance optimization,
                        and continuous innovation.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default AboutTeam;
