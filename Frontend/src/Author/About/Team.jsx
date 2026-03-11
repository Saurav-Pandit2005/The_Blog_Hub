import React from 'react';
import './Team.css';
import team1 from '../../assets/Images/Author/About/team1.jpg';
import team2 from '../../assets/Images/Author/About/team2.jpg';
import team3 from '../../assets/Images/Author/About/team3.jpg';

function Team() {
    return (
        <section className="about-team">
            <div className="team-header">
                <h2>Our Visionary Team</h2>
                <p>
                    The dedicated individuals who ensure The Blog Hub remains
                    the ultimate home for qualitative digital content.
                </p>
            </div>

            <div className="team-grid">
                <div className="team-card">
                    <img src={team1} alt="Razz Patel" />
                    <h3>Razz Patel</h3>
                    <span>Project Founder & Developer</span>
                    <p>
                        Architecting the digital foundation to empower
                        creators across the globe.
                    </p>
                </div>

                <div className="team-card">
                    <img src={team2} alt="Surbhi Khyati" />
                    <h3>Surbhi Khyati</h3>
                    <span>Head of Author Relations</span>
                    <p>
                        Ensures every voice is heard and every author
                        has the support they need.
                    </p>
                </div>

                <div className="team-card">
                    <img src={team3} alt="Kriti Goyal" />
                    <h3>Kriti Goyal</h3>
                    <span>Experience Designer</span>
                    <p>
                        Crafting intuitive and beautiful tools for
                        a seamless storytelling journey.
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Team;